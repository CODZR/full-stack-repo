from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import get_current_user


blog_router = APIRouter(tags=["Blog"])
blog_crud = CRUDBase(model=models.Blog)


@blog_router.get("/blogs")
def list_blogs(
    page: int = 1, limit: int = 10, db: Session = Depends(get_db)
) -> List[schemas.BlogList]:
    db_blogs = blog_crud.list_multi(db=db, page=int(page), limit=(limit))
    return db_blogs


@blog_router.post("/blogs", response_model=schemas.BlogDetails)
def create_blog(
    new_blog: schemas.BlogCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_blog.model_dump()
    blog = blog_crud.create(db=db, obj_in=new_blog)
    return blog


@blog_router.get("/blog/{blog_id}")
def find_blog(blog_id: int, db: Session = Depends(get_db)) -> schemas.BlogDetails:
    db_blog = blog_crud.get(db, blog_id)
    return db_blog


@blog_router.put("/blog/{blog_id}", response_model=schemas.BlogUpdate)
def update_blog(
    blog_id: int,
    updated_blog: schemas.BlogUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_blog.model_dump()
    blog = blog_crud.update(db=db, obj_id=blog_id, obj_in=updated_blog)
    return blog


@blog_router.delete(
    "/blog/{blog_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response
)
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    blog = blog_crud.delete(db, blog_id)
    return blog
