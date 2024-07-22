from datetime import datetime, timedelta
import json
from typing import List
import uuid
from pydantic import Json
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from app.core.config import Settings


from app.db.base_class import DeclarativeBase, IDMixin, TimestampMixin
from sqlalchemy.orm import relationship

from app.schemas.weather import WeatherMinutelySchema
from app.utils.rwmodel import list_2_listStr


class User(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "user"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), index=True, nullable=False)
    role = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    blogs = relationship("Blog", back_populates="user")


class Blog(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "blog"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), unique=True, index=True, nullable=False)
    content = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user_id = Column(Integer, ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="blogs")


# Database model, database table inferred from class name
class Faq(DeclarativeBase, IDMixin):
    __tablename__ = "faq"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)


class Hanzi(DeclarativeBase, IDMixin):
    __tablename__ = "hanzi"
    __table_args__ = {"extend_existing": True}

    zi = Column(String(64), nullable=False, comment="字")
    pinyin = Column(String(64), nullable=False, comment="拼音")
    bushou = Column(String(64), nullable=False, comment="部首")
    bushoubh = Column(Integer, nullable=False, comment="部首笔画")
    zbh = Column(Integer, nullable=False, comment="总笔画")
    kxzdbh = Column(Integer, nullable=False, comment="康熙字典笔画")
    wb86 = Column(String(64), nullable=False, comment="五笔86")
    wb98 = Column(String(64), nullable=False, comment="五笔98")
    unicode = Column(String(64), nullable=False, comment="UniCode")
    hzwx = Column(String(255), nullable=False, comment="汉子五行")
    jxyy = Column(String(255), nullable=False, comment="吉凶寓意")
    cyz = Column(String(255), nullable=False, comment="是否为常用字")
    xmx = Column(String(255), nullable=False, comment="姓名学")
    bsdx = Column(String(255), nullable=False, comment="笔顺读写")
    jbjs = Column(Text, nullable=False, comment="基本解释")
    xhzdxxjs = Column(Text, nullable=False, comment="新华字典详细解释")
    hydzdjs = Column(Text, nullable=False, comment="汉语大字典解释")
    kxzdjs = Column(Text, nullable=False, comment="康熙字典解释")
    swjzxj = Column(Text, nullable=False, comment="说文解字详解")
    swjzxjpic = Column(String(255), nullable=False, comment="说文解字详解图片")
    zyybpic = Column(String(255), nullable=False, comment="字源演变图片")
    xgsf = Column(Text, nullable=False, comment="相关书法")
    xgcy = Column(Text, nullable=False, comment="相关词语")
    xgchengyu = Column(Text, nullable=False, comment="相关成语")
    xgsc = Column(Text, nullable=False, comment="相关诗词")
    kxzdpic = Column(String(255), nullable=False, comment="康熙字典原图")


class WeatherMinutely(DeclarativeBase, IDMixin):
    __tablename__ = "weather_minutely"
    __table_args__ = {"extend_existing": True}

    location = Column(String(64))
    precipitation_2h = Column(String(64))
    precipitation = Column(String(64))
    probability = Column(String(64))
    description = Column(String)
    primary = Column(Integer, nullable=False)
    forecast_keypoint = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    def to_dict(self) -> dict:
        validated_data_dict = WeatherMinutelySchema.model_validate(
            self.__dict__
        ).model_dump(exclude_none=True)
        return validated_data_dict

    def to_json(self) -> Json:
        validated_data_json = WeatherMinutelySchema.model_validate(
            self.__dict__
        ).model_dump_json(exclude_none=True)
        return json.loads(validated_data_json)


class WeatherHourly(DeclarativeBase, IDMixin):
    __tablename__ = "weather_hourly"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
