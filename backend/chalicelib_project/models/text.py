# import json
# from uuid import uuid4
# from pydantic import Json

# from sqlalchemy import (
#     JSON,
#     UUID,
#     Column,
#     Integer,
#     Text,
#     func,
#     ForeignKey,
#     UniqueConstraint,
#     text,
# )
# from sqlalchemy.orm import mapped_column, Mapped
# from sqlalchemy.types import DateTime, String
# from extensions.ext_database import db_session
# from core.models import ModelBase

# from schemas.text import TextSchema


# class TextModel(ModelBase):
#     __tablename__ = "text"

#     content: Mapped[str] = mapped_column(Text, nullable=False)

#     def to_dict(self) -> dict:
#         validated_data_dict = TextSchema.model_validate(self.__dict__).model_dump(
#             exclude_none=True
#         )
#         return validated_data_dict

#     def to_json(self) -> Json:
#         validated_data_json = TextSchema.model_validate(self.__dict__).model_dump_json(
#             exclude_none=True
#         )
#         return json.loads(validated_data_json)
