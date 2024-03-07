from typing import Optional
from pydantic import Field
from core.schemas import SchemaBase


class FaqSchema(SchemaBase):
    question: Optional[str] = Field("", max_length=255, description="FAQ Question")
    answer: Optional[str] = Field("", max_length=2048, description="FAQ Answer")
