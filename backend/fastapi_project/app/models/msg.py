# Generic message


# Generic message
import uuid
from sqlalchemy import UUID, Column
from app.db.base_class import ModelBase


class Message(ModelBase):
    __tablename__ = "message"
    __table_args__ = {"extend_existing": True}

    message: str
