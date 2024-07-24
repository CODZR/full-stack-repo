from datetime import datetime
from typing import List, Optional, Text

from pydantic import BaseModel


class ListStr(str):
    @classmethod
    def __get_validators__(cls) -> "callable":
        yield cls.validate

    @classmethod
    def validate(cls, v: str, _):
        print(f"row: 13 - col: 23 v -> {v}")
        return v.split(",") if v else None


# Shared properties
class WeatherHourlySchema(BaseModel):
    location: ListStr = None  # 请求经纬度
    description: str = None  # 预报描述
    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间
    # 24h List数据 [] length 24
    precipitation_value: ListStr = None  # 24h降水量数据
    precipitation_probability: ListStr = None  # 24h降水概率数据
    temperature: ListStr = None  # 24h地表2米气温
    apparent_temperature: ListStr = None  # 24h体感温度
    wind_speed: ListStr = None  # 24h地表10米风速
    wind_direction: ListStr = None  # 24h地表10米风向
    humidity: ListStr = None  # 24h地表2米相对湿度
    cloudrate: ListStr = None  # 24h云量
    skycon: ListStr = None  # 24h天气现象
    pressure: ListStr = None  # 24h地面气压
    visibility: ListStr = None  # 24h地表水平能见度
    dswrf: ListStr = None  # 24h向下短波辐射通量
    aqi: ListStr = None  # 24h国标AQI
    pm25: ListStr = None  # 24h PM2.5浓度


class WeatherMinutelySchema(BaseModel):
    location: ListStr = None  # 请求经纬度
    precipitation_2h: ListStr = None  # 未来2小时每分钟的雷达降水强度
    precipitation: ListStr = None  # 未来1小时每分钟的雷达降水强度
    probability: ListStr = None  # 未来两小时每半小时的降水概率
    description: str = None  # 预报描述
    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间
