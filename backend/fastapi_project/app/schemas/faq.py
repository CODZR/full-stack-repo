from typing import Optional, Text

from pydantic import UUID4, BaseModel


from app.schemas.base import IDSchema


# Shared properties
class FaqBasic(BaseModel):
    question: str = None
    answer: Text = None


class FaqList(FaqBasic, IDSchema):
    class Config:
        from_attributes = True


class FaqCreate(FaqBasic):
    class Config:
        from_attributes = True


class FaqDetails(FaqBasic, IDSchema):
    class Config:
        from_attributes = True


class FaqUpdate(FaqBasic):

    class Config:
        extra = "forbid"
        from_attributes = True
