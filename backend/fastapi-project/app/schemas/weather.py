from datetime import datetime
from typing import List, Optional, Text

from pydantic import BaseModel


class ListStr(str):
    @classmethod
    def __get_validators__(cls) -> "callable":
        yield cls.validate

    @classmethod
    def validate(cls, v: str, _):
        return v.split(",")


# Shared properties
class WeatherHourlySchema(BaseModel):
    question: str = None
    answer: Text = None


class WeatherMinutelySchema(BaseModel):
    location: ListStr = None  # 请求经纬度
    precipitation_2h: ListStr = None  # 未来2小时每分钟的雷达降水强度
    precipitation: ListStr = None  # 未来1小时每分钟的雷达降水强度
    probability: ListStr = None  # 未来两小时每半小时的降水概率
    description: str = None  # 预报描述
    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
