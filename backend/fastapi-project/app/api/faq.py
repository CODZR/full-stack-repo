from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import get_current_user


faq_router = APIRouter(tags=["Faq"])
faq_crud = CRUDBase(model=models.Faq)


@faq_router.get("/faqs")
def list_faqs(
    page: int = 1, limit: int = 10, db: Session = Depends(get_db)
) -> List[schemas.FaqList]:
    db_faqs = faq_crud.list_multi(db=db, page=int(page), limit=(limit))
    return db_faqs


@faq_router.post("/faqs", response_model=schemas.FaqDetails)
def create_faq(
    new_faq: schemas.FaqCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_faq.model_dump()
    faq = faq_crud.create(db=db, obj_in=new_faq)
    return faq


@faq_router.get("/faq/{faq_id}")
def find_faq(faq_id: int, db: Session = Depends(get_db)) -> schemas.FaqDetails:
    db_faq = faq_crud.get(db, faq_id)
    return db_faq


@faq_router.put("/faq/{faq_id}", response_model=schemas.FaqUpdate)
def update_faq(
    faq_id: int,
    updated_faq: schemas.FaqUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_faq.model_dump()
    faq = faq_crud.update(db=db, obj_id=faq_id, obj_in=updated_faq)
    return faq


@faq_router.delete(
    "/faq/{faq_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response
)
def delete_faq(
    faq_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    faq = faq_crud.delete(db, faq_id)
    return faq
