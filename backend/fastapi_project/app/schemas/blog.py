from pydantic import BaseModel
from typing import Optional, Text

from app.schemas.base import IDSchema, TimestampSchema


class BlogBasic(BaseModel):
    title: str
    content: Text


class BlogBasicWithAuthor(BlogBasic):
    user_id: int


class BlogList(BlogBasicWithAuthor, IDSchema):
    class Config:
        from_attributes = True


class BlogCreate(BaseModel):
    title: str
    content: str
    user_id: int = "57785471-bc81-4062-a621-15657ccc0a0c"

    class Config:
        from_attributes = True


class BlogDetails(TimestampSchema, BlogCreate, IDSchema):
    class Config:
        from_attributes = True


class BlogUpdate(IDSchema):
    title: Optional[str]
    content: Optional[str]

    class Config:
        extra = "forbid"
        from_attributes = True
