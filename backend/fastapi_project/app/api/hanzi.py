from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session
from app.schemas.hanzi import (
    HanziCreate,
    HanziDetails,
    HanziItem,
    HanziItems,
    HanziUpdate,
)

from core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import get_current_user


hanzi_router = APIRouter(tags=["Hanzi"])
hanzi_crud = CRUDBase(model=models.Hanzi)


@hanzi_router.get("/hanzis", response_model=HanziItems)
def list_hanzis(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    db_hanzis = hanzi_crud.list_multi(db=db, page=int(page), limit=(limit))
    return HanziItems(items=db_hanzis)


@hanzi_router.post(
    "/hanzis", status_code=status.HTTP_201_CREATED, response_model=HanziItem
)
def create_hanzi(
    new_hanzi: HanziCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_hanzi.model_dump()
    hanzi = hanzi_crud.create(db=db, obj_in=new_hanzi)
    return HanziItem(hanzi)


@hanzi_router.get("/hanzi/search", response_model=HanziItem)
def search_hanzi(zi: str, db: Session = Depends(get_db)) -> HanziDetails:
    db_hanzi = hanzi_crud.get_by_field(db, "zi", zi)
    return HanziItem(item=db_hanzi)


@hanzi_router.get("/hanzi/{hanzi_id}", response_model=HanziItem)
def find_hanzi(hanzi_id: int, db: Session = Depends(get_db)):
    db_hanzi = hanzi_crud.get(db, hanzi_id)
    return HanziItem(item=db_hanzi)


@hanzi_router.put("/hanzi/{hanzi_id}", response_model=HanziItem)
def update_hanzi(
    hanzi_id: int,
    updated_hanzi: HanziUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_hanzi.model_dump()
    hanzi = hanzi_crud.update(db=db, obj_id=hanzi_id, obj_in=updated_hanzi)

    return HanziItem(item=hanzi)


@hanzi_router.delete("/hanzi/{hanzi_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hanzi(
    hanzi_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    hanzi_crud.delete(db, hanzi_id)
    return ""
