from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.db.base import get_db
from app.db.crud import CRUDBase

from app import models, schemas
from app.services.oauth2 import get_current_user

router = APIRouter()
from fastapi.params import Depends
from sqlalchemy.orm import Session

faq_router = APIRouter(prefix="/faq", tags=["Faq"])
faq_crud = CRUDBase(model=models.Faq)


@faq_router.post("", response_model=schemas.FaqDetails)
def create_faq(
    new_faq: schemas.FaqCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_faq.model_dump()
    faq = faq_crud.create(db=db, obj_in=new_faq)
    return faq
