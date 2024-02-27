from typing import Union
import uuid

from sqlalchemy import UUID, Column, ForeignKey, String, Text


from app.db.base_class import ModelBase
from sqlalchemy.orm import relationship


# Shared properties
class FaqBase(ModelBase):
    __tablename__ = "faq"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), unique=True, index=True, nullable=False)
    answer = Column(Text, nullable=False)


# Properties to receive on faq creation
class FaqCreate(FaqBase):
    pass


# Properties to receive on faq update
class FaqUpdate(FaqBase):
    pass


# Database model, database table inferred from class name
class Faq(FaqBase, table=True):
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="faqs")


# Properties to return via API, id is always required
class FaqOut(FaqBase):
    id: int
