from typing import Optional

from pydantic import BaseModel


# Shared properties
class FaqBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to receive on item creation
class FaqCreate(FaqBase):
    title: str


# Properties to receive on item update
class FaqUpdate(FaqBase):
    pass


# Properties shared by models stored in DB
class FaqInDBBase(FaqBase):
    id: int
    title: str
    owner_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Faq(FaqInDBBase):
    pass


# Properties properties stored in DB
class FaqInDB(FaqInDBBase):
    pass
