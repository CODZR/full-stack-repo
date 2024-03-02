from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional

from app.schemas.base import IDSchema, TimestampSchema


class UserBasic(BaseModel):
    email: EmailStr
    username: str
    role: str

    class Config:
        from_attributes = True


class UserCreateRequest(BaseModel):
    username: str
    password: str
    confirm_password: str
    token: str

    class Config:
        extra = "forbid"
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

    class Config:
        extra = "forbid"
        from_attributes = True


class UserDetails(TimestampSchema, UserBasic, IDSchema):
    role: str

    class Config:
        from_attributes = True


class UserUpdate(IDSchema):
    email: Optional[EmailStr]
    password: Optional[str]
    username: Optional[str]
    bio: Optional[str]

    class Config:
        extra = "forbid"
        from_attributes = True


class UserList(BaseModel):
    email: EmailStr
    username: str

    class Config:
        from_attributes = True
