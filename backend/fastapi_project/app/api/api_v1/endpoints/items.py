from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.api.deps import CurrentUser, SessionDep
from app.models import Faq, FaqCreate, FaqOut, FaqUpdate, Message

router = APIRouter()


@router.get("/", response_model=list[FaqOut])
def read_items(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve items.
    """

    if current_user.is_superuser:
        statement = select(Faq).offset(skip).limit(limit)
        return session.exec(statement).all()
    else:
        statement = (
            select(Faq).where(Faq.owner_id == current_user.id).offset(skip).limit(limit)
        )
        return session.exec(statement).all()


@router.get("/{id}", response_model=FaqOut)
def read_item(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get item by ID.
    """
    item = session.get(Faq, id)
    if not item:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return item


@router.post("/", response_model=FaqOut)
def create_item(
    *, session: SessionDep, current_user: CurrentUser, item_in: FaqCreate
) -> Any:
    """
    Create new item.
    """
    item = Faq.model_validate(item_in, update={"owner_id": current_user.id})
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{id}", response_model=FaqOut)
def update_item(
    *, session: SessionDep, current_user: CurrentUser, id: int, item_in: FaqUpdate
) -> Any:
    """
    Update an item.
    """
    item = session.get(Faq, id)
    if not item:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = item_in.model_dump(exclude_unset=True)
    item.sqlmodel_update(update_dict)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.delete("/{id}")
def delete_item(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an item.
    """
    item = session.get(Faq, id)
    if not item:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(item)
    session.commit()
    return Message(message="Faq deleted successfully")
