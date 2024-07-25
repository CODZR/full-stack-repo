from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, validator


class WeatherHourlySchema(BaseModel):
    location: List[str] = None  # 请求经纬度
    description: str = None  # 预报描述
    first_hour_datetime: Optional[datetime] = None  # 48h里第一个h的时间
    precipitation_value_in_48h: List[str] = None  # 48h降水量数据
    precipitation_probability_in_48h: List[str] = None  # 48h降水概率数据
    temperature_in_48h: List[str] = None  # 48h地表2米气温
    apparent_temperature_in_48h: List[str] = None  # 48h体感温度
    wind_speed_in_48h: List[str] = None  # 48h地表10米风速
    wind_direction_in_48h: List[str] = None  # 48h地表10米风向
    humidity_in_48h: List[str] = None  # 48h地表2米相对湿度
    cloudrate_in_48h: List[str] = None  # 48h云量
    skycon_in_48h: List[str] = None  # 48h天气现象
    pressure_in_48h: List[str] = None  # 48h地面气压
    visibility_in_48h: List[str] = None  # 48h地表水平能见度
    dswrf_in_48h: List[str] = None  # 48h向下短波辐射通量
    aqi_in_48h: List[str] = None  # 48h国标AQI
    pm25_in_48h: List[str] = None  # 48h PM2.5浓度

    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间

    @validator(
        "location",
        "precipitation_value_in_48h",
        "precipitation_probability_in_48h",
        "temperature_in_48h",
        "apparent_temperature_in_48h",
        "wind_speed_in_48h",
        "wind_direction_in_48h",
        "humidity_in_48h",
        "cloudrate_in_48h",
        "skycon_in_48h",
        "pressure_in_48h",
        "visibility_in_48h",
        "dswrf_in_48h",
        "aqi_in_48h",
        "pm25_in_48h",
        pre=True,
    )
    def split_string(cls, v):
        return v.split(",") if isinstance(v, str) else v


class WeatherMinutelySchema(BaseModel):
    location: List[str] = None  # 请求经纬度
    precipitation_in_2h: List[str] = None  # 未来2小时每分钟的雷达降水强度
    precipitation: List[str] = None  # 未来1小时每分钟的雷达降水强度
    probability: List[str] = None  # 未来两小时每半小时的降水概率
    description: str = None  # 预报描述
    primary: int = None  # 主要预报
    forecast_keypoint: str = None  # 预报关键点
    created_at: Optional[datetime] = None  # 创建时间

    @validator(
        "location", "precipitation_in_2h", "precipitation", "probability", pre=True
    )
    def split_string(cls, v):
        return v.split(",") if isinstance(v, str) else v
