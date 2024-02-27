from typing import Union

from pydantic import EmailStr
from sqlalchemy import Boolean, Column, String

from sqlalchemy.orm import relationship

from app.db.base_class import ModelBase


# Shared properties
class UserBase(ModelBase):
    email: EmailStr = Column(String(255), unique=True, index=True)
    is_active: bool = Column(Boolean, default=True, nullable=False)
    is_superuser: bool = Column(Boolean, default=False, nullable=False)
    full_name: Union[str, None] = Column(String(255), nullable=True)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password = Column(String(255), nullable=False)


class UserCreateOpen(ModelBase):
    email: EmailStr = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    full_name: Union[str, None] = Column(String(255), nullable=True)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: Union[EmailStr, None] = None
    password: Union[str, None] = None


class UserUpdateMe(ModelBase):
    full_name: Union[str, None] = None
    email: Union[EmailStr, None] = None


class UpdatePassword(ModelBase):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: Union[int, None] = Column(default=None, primary_key=True)
    hashed_password: str
    faqs = relationship("Faq", back_populates="user")


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int


class NewPassword(ModelBase):
    token: str
    new_password: str
