from pydantic import BaseModel, UUID4
from typing import Optional

from app.schemas.base import IDSchema, TimestampSchema


class BlogBasic(BaseModel):
    title: str
    author: UUID4


class BlogBasicWithAuthor(BlogBasic):
    author: UUID4


class BlogList(BlogBasicWithAuthor, IDSchema):
    class Config:
        from_attributes = True


class BlogCreate(BaseModel):
    title: str
    body: str
    author: UUID4 = "57785471-bc81-4062-a621-15657ccc0a0c"

    class Config:
        from_attributes = True


class BlogDetails(TimestampSchema, BlogCreate, IDSchema):
    class Config:
        from_attributes = True


class BlogUpdate(IDSchema):
    title: Optional[str]
    body: Optional[str]

    class Config:
        extra = "forbid"
        from_attributes = True
