import json
from pydantic import Json

from sqlalchemy import Text
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.types import String
from core.models import ModelBase
from schemas.faq import FaqSchema


class FaqModel(ModelBase):
    __tablename__ = "faq"

    question: Mapped[str] = mapped_column(String(255), nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)

    def to_dict(self) -> dict:
        validated_data_dict = FaqSchema.model_validate(self.__dict__).model_dump(exclude_none=True)
        return validated_data_dict

    def to_json(self) -> Json:
        validated_data_json = FaqSchema.model_validate(self.__dict__).model_dump_json(exclude_none=True)
        return json.loads(validated_data_json)
