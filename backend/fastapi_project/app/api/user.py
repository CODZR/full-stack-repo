from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session
from app.schemas.user import (
    UserDetails,
    UserItem,
    UserItems,
    UserUpdate,
)
from app.utils.security import get_password_hash

from core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import add_new_role_in_org, get_current_user


user_router = APIRouter(tags=["User"])
user_crud = CRUDBase(model=models.User)


@user_router.get("/users", response_model=UserItems)
def list_users(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    db_users = user_crud.list_multi(db=db, page=int(page), limit=(limit))
    return UserItems(items=db_users)


@user_router.post("/users", response_model=schemas.UserDetails)
def create_user(data: schemas.UserCreateRequest, db: Session = Depends(get_db)):
    token_data = data.token

    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Password did not match")

    if not token_data:
        raise HTTPException(
            status_code=400, detail="Invalid information or expired invitation link"
        )

    existing_user = (
        db.query(models.User).filter(models.User.email == data.email).first()
    )
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
        )

    user = schemas.UserCreate(
        username=data.username,
        password=get_password_hash(data.password),
        email=data.email,
        role=data.role,
    )
    user.model_dump()
    user_dict = user_crud.create(db=db, obj_in=user)

    # Add role to the new user
    add_new_role_in_org(user.email, data.role, db)

    return user_dict


@user_router.get("/user/search", response_model=UserItem)
def search_user(zi: str, db: Session = Depends(get_db)) -> UserDetails:
    db_user = user_crud.get_by_field(db, "zi", zi)
    return UserItem(item=db_user)


@user_router.get("/user/{user_id}", response_model=UserItem)
def find_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.get(db, user_id)
    return UserItem(item=db_user)


@user_router.put("/user/{user_id}", response_model=UserItem)
def update_user(
    user_id: int,
    updated_user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_user.model_dump()
    user = user_crud.update(db=db, obj_id=user_id, obj_in=updated_user)

    return UserItem(item=user)


@user_router.delete("/user/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    user_crud.delete(db, user_id)
    return ""
