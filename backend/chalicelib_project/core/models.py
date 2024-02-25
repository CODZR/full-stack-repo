from datetime import datetime
from uuid import uuid4

from sqlalchemy import Index, func, text
from sqlalchemy.types import DateTime, String, Boolean, Integer

from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase


class IDMixin:
    id: Mapped[str] = mapped_column(String(48), primary_key=True, default=uuid4, nullable=False)
    idx: Mapped[str] = mapped_column(Integer, default=1)


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        onupdate=func.now(),
        server_default=func.now(),
    )


class SoftDeleteMixin:
    deleted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False)


class ModelBase(DeclarativeBase, IDMixin, TimestampMixin):
    pass
