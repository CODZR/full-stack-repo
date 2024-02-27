import datetime
from typing import Any
from uuid import uuid4
from sqlalchemy import Boolean, Column, DateTime, Integer, String, func
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class DeclarativeBase:
    id: Any
    __name__: str
    # Generate __tablename__ automatically

    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()


class IDMixin:
    id = Column(String(48), primary_key=True, default=uuid4, nullable=False)
    idx = Column(Integer, default=1)


class TimestampMixin:
    created_at = Column(
        DateTime(timezone=True), default=func.now(), server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        nullable=True,
        onupdate=func.now(),
        server_default=func.now(),
    )


class SoftDeleteMixin:
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    is_deleted = Column(Boolean, default=False)


class ModelBase(DeclarativeBase, IDMixin, TimestampMixin):
    pass
