import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


# -------------- mixins --------------
class IDSchema(BaseModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4)
    idx: int = Field(default_factory=None)


class TimestampSchema(BaseModel):
    created_at: datetime = Field(default=None)
    updated_at: datetime = Field(default=None)


class PersistentDeletion(BaseModel):
    deleted_at: datetime = Field(default=None)
    is_deleted: bool = False


class SchemaBase(IDSchema, TimestampSchema):
    pass
