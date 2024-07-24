from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, validator


class WeatherHourlySchema(BaseModel):
    location: List[str] = None  # 请求经纬度
    description: str = None  # 预报描述
    precipitation_value_24h: List[str] = None  # 24h降水量数据
    precipitation_probability_24h: List[str] = None  # 24h降水概率数据
    temperature_24h: List[str] = None  # 24h地表2米气温
    apparent_temperature_24h: List[str] = None  # 24h体感温度
    wind_speed_24h: List[str] = None  # 24h地表10米风速
    wind_direction_24h: List[str] = None  # 24h地表10米风向
    humidity_24h: List[str] = None  # 24h地表2米相对湿度
    cloudrate_24h: List[str] = None  # 24h云量
    skycon_24h: List[str] = None  # 24h天气现象
    pressure_24h: List[str] = None  # 24h地面气压
    visibility_24h: List[str] = None  # 24h地表水平能见度
    dswrf_24h: List[str] = None  # 24h向下短波辐射通量
    aqi_24h: List[str] = None  # 24h国标AQI
    pm25_24h: List[str] = None  # 24h PM2.5浓度

    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间

    @validator(
        "location",
        "precipitation_value_24h",
        "precipitation_probability_24h",
        "temperature_24h",
        "apparent_temperature_24h",
        "wind_speed_24h",
        "wind_direction_24h",
        "humidity_24h",
        "cloudrate_24h",
        "skycon_24h",
        "pressure_24h",
        "visibility_24h",
        "dswrf_24h",
        "aqi_24h",
        "pm25_24h",
        pre=True,
    )
    def split_string(cls, v):
        return v.split(",") if isinstance(v, str) else v


class WeatherMinutelySchema(BaseModel):
    location: List[str] = None  # 请求经纬度
    precipitation_2h: List[str] = None  # 未来2小时每分钟的雷达降水强度
    precipitation: List[str] = None  # 未来1小时每分钟的雷达降水强度
    probability: List[str] = None  # 未来两小时每半小时的降水概率
    description: str = None  # 预报描述
    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间

    @validator("location", "precipitation_2h", "precipitation", "probability", pre=True)
    def split_string(cls, v):
        return v.split(",") if isinstance(v, str) else v
