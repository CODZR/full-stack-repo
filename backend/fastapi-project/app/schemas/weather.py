from datetime import datetime
from typing import List, Optional, Text

from pydantic import UUID4, BaseModel


from app.schemas.base import SchemaBasic


# Shared properties
class WeatherHourly(SchemaBasic):
    question: str = None
    answer: Text = None


class WeatherMinutely(SchemaBasic):
    location: List[int] = None  # 请求经纬度
    precipitation_2h: List[int] = None  # 未来2小时每分钟的雷达降水强度
    precipitation: List[int] = None  # 未来1小时每分钟的雷达降水强度
    probability: List[int] = None  # 未来两小时每半小时的降水概率
    description: str = None  # 预报描述
    primary: str = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
