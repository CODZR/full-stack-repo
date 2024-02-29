from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional

from app.schemas.base import IDSchema, TimestampSchema


class UserBasic(BaseModel):
    email: EmailStr
    full_name: str
    organization_name: str = None
    organizational_role: str = None

    class Config:
        from_attributes = True


class UserCreateRequest(BaseModel):
    full_name: str
    password: str
    confirm_password: str
    token: str

    class Config:
        extra = "forbid"
        from_attributes = True


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    organization_name: str
    organizational_role: str = Optional
    role: str
    invited_by_id: UUID4 = Optional

    class Config:
        extra = "forbid"
        from_attributes = True


class UserDetails(TimestampSchema, UserBasic, IDSchema):
    role: str
    invited_by_id: UUID4 = Optional

    class Config:
        from_attributes = True


class UserUpdate(IDSchema):
    email: Optional[EmailStr]
    password: Optional[str]
    full_name: Optional[str]
    bio: Optional[str]

    class Config:
        extra = "forbid"
        from_attributes = True


class UserList(BaseModel):
    email: EmailStr
    full_name: str

    class Config:
        from_attributes = True
