from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import get_current_user


hanzi_router = APIRouter(tags=["Hanzi"])
hanzi_crud = CRUDBase(model=models.Hanzi)


@hanzi_router.get("/hanzis")
def list_hanzis(
    page: int = 1, limit: int = 10, db: Session = Depends(get_db)
) -> List[schemas.HanziList]:
    db_hanzis = hanzi_crud.list_multi(db=db, page=int(page), limit=(limit))
    return db_hanzis


@hanzi_router.post("/hanzis", response_model=schemas.HanziDetails)
def create_hanzi(
    new_hanzi: schemas.HanziCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_hanzi.model_dump()
    hanzi = hanzi_crud.create(db=db, obj_in=new_hanzi)
    return hanzi


@hanzi_router.get("/hanzi/{hanzi_id}")
def find_hanzi(hanzi_id: int, db: Session = Depends(get_db)) -> schemas.HanziDetails:
    db_hanzi = hanzi_crud.get(db, hanzi_id)
    return db_hanzi


@hanzi_router.put("/hanzi/{hanzi_id}", response_model=schemas.HanziUpdate)
def update_hanzi(
    hanzi_id: int,
    updated_hanzi: schemas.HanziUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_hanzi.model_dump()
    hanzi = hanzi_crud.update(db=db, obj_id=hanzi_id, obj_in=updated_hanzi)
    return hanzi


@hanzi_router.delete(
    "/hanzi/{hanzi_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response
)
def delete_hanzi(
    hanzi_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    hanzi = hanzi_crud.delete(db, hanzi_id)
    return hanzi
