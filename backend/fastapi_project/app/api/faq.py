from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from app.services.deps import CurrentUser, SessionDep
from app.models import Faq, FaqCreate, FaqOut, FaqUpdate, Message

router = APIRouter()


@router.get("/", response_model=list[FaqOut])
def read_faqs(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve faqs.
    """

    if current_user.is_superuser:
        statement = select(Faq).offset(skip).limit(limit)
        return session.exec(statement).all()
    else:
        statement = (
            select(Faq).where(Faq.user_id == current_user.id).offset(skip).limit(limit)
        )
        return session.exec(statement).all()


@router.get("/{id}", response_model=FaqOut)
def read_faq(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get faq by ID.
    """
    faq = session.get(Faq, id)
    if not faq:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (faq.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return faq


@router.post("/", response_model=FaqOut)
def create_faq(
    *, session: SessionDep, current_user: CurrentUser, faq_in: FaqCreate
) -> Any:
    """
    Create new faq.
    """
    faq = Faq.model_validate(faq_in, update={"user_id": current_user.id})
    session.add(faq)
    session.commit()
    session.refresh(faq)
    return faq


@router.put("/{id}", response_model=FaqOut)
def update_faq(
    *, session: SessionDep, current_user: CurrentUser, id: int, faq_in: FaqUpdate
) -> Any:
    """
    Update an faq.
    """
    faq = session.get(Faq, id)
    if not faq:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (faq.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = faq_in.model_dump(exclude_unset=True)
    faq.sqlmodel_update(update_dict)
    session.add(faq)
    session.commit()
    session.refresh(faq)
    return faq


@router.delete("/{id}")
def delete_faq(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an faq.
    """
    faq = session.get(Faq, id)
    if not faq:
        raise HTTPException(status_code=404, detail="Faq not found")
    if not current_user.is_superuser and (faq.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(faq)
    session.commit()
    return Message(message="Faq deleted successfully")
