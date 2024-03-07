from pydantic import BaseModel
from typing import Optional, Text

from app.schemas.base import IDSchema, TimestampSchema


class BlogBasic(BaseModel):
    title: str
    content: Text
    user_id: int


class BlogList(BlogBasic, IDSchema):
    class Config:
        from_attributes = True


class BlogCreate(BlogBasic):

    class Config:
        from_attributes = True


class BlogDetails(BlogBasic, IDSchema):
    class Config:
        from_attributes = True


class BlogUpdate(BlogBasic):
    title: Optional[str]
    content: Optional[str]

    class Config:
        from_attributes = True
