from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.services.deps import CurrentUser, SessionDep
from app.models import Hanzi, HanziCreate, HanziOut, HanziUpdate, Message

router = APIRouter()


@router.get("/", response_model=list[HanziOut])
def read_hanzis(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve hanzis.
    """

    if current_user.is_superuser:
        statement = select(Hanzi).offset(skip).limit(limit)
        return session.exec(statement).all()
    else:
        statement = (
            select(Hanzi)
            .where(Hanzi.user_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        return session.exec(statement).all()


@router.get("/{id}", response_model=HanziOut)
def read_hanzi(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get hanzi by ID.
    """
    hanzi = session.get(Hanzi, id)
    if not hanzi:
        raise HTTPException(status_code=404, detail="Hanzi not found")
    if not current_user.is_superuser and (hanzi.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return hanzi


@router.post("/", response_model=HanziOut)
def create_hanzi(
    *, session: SessionDep, current_user: CurrentUser, hanzi_in: HanziCreate
) -> Any:
    """
    Create new hanzi.
    """
    hanzi = Hanzi.model_validate(hanzi_in, update={"user_id": current_user.id})
    session.add(hanzi)
    session.commit()
    session.refresh(hanzi)
    return hanzi


@router.put("/{id}", response_model=HanziOut)
def update_hanzi(
    *, session: SessionDep, current_user: CurrentUser, id: int, hanzi_in: HanziUpdate
) -> Any:
    """
    Update an hanzi.
    """
    hanzi = session.get(Hanzi, id)
    if not hanzi:
        raise HTTPException(status_code=404, detail="Hanzi not found")
    if not current_user.is_superuser and (hanzi.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = hanzi_in.model_dump(exclude_unset=True)
    hanzi.sqlmodel_update(update_dict)
    session.add(hanzi)
    session.commit()
    session.refresh(hanzi)
    return hanzi


@router.delete("/{id}")
def delete_hanzi(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an hanzi.
    """
    hanzi = session.get(Hanzi, id)
    if not hanzi:
        raise HTTPException(status_code=404, detail="Hanzi not found")
    if not current_user.is_superuser and (hanzi.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(hanzi)
    session.commit()
    return Message(message="Hanzi deleted successfully")
