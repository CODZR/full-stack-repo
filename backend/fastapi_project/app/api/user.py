from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.utils.security import get_password_hash
from app.services.oauth2 import add_new_role_in_org

user_router = APIRouter(prefix="/user", tags=["User"])
user_crud = CRUDBase(model=models.User)


@user_router.post("", response_model=schemas.UserDetails)
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


@user_router.get("")
def get_users(db: Session = Depends(get_db)) -> List[schemas.UserList]:
    db_users = db.query(models.User)
    return db_users
