from datetime import datetime
import uuid

from pydantic import BaseModel, Field


# -------------- mixins --------------
class IDSchema(BaseModel):
    id: int = Field(default_factory=None)
    # idx: int = Field(default_factory=None)


class TimestampSchema(BaseModel):
    created_at: datetime = Field(default=None)
    updated_at: datetime = Field(default=None)


class SchemaBasic(IDSchema, TimestampSchema):
    pass
