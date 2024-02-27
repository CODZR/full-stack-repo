from typing import Union
import uuid

from sqlalchemy import UUID, Column, ForeignKey, String, Text


from app.db.base_class import DeclarativeBase, IDMixin, TimestampMixin
from sqlalchemy.orm import relationship


# Database model, database table inferred from class name
class Faq(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "faqs"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), unique=True, index=True, nullable=False)
    answer = Column(Text, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="faqs")
