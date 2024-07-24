from datetime import datetime, timedelta

from pydantic import ValidationError
from app.core.logger import logger
from app.db.base import db_session, get_db
from app.models import WeatherHourly, WeatherMinutely
from app.schemas.weather import WeatherHourlySchema, WeatherMinutelySchema
from app.utils.rwmodel import list_2_listStr


def delete_expired_weather_data(db, WeatherSchema):
    try:
        one_week_ago = datetime.now() - timedelta(weeks=1)
        expired_data = (
            db.query(WeatherSchema)
            .filter(WeatherSchema.created_at < one_week_ago)
            .all()
        )

        if expired_data:
            for data in expired_data:
                db.delete(data)
            db.commit()
    except Exception as e:
        logger.error(f"delete_expired_weather_data: {e}")
        db.rollback()


def save_data_by_hourly_in_database(weather_hourly_data):
    try:
        result = weather_hourly_data["result"]
        if result:
            hourly = result["hourly"] or {}

            weather_hourly = {
                "location": list_2_listStr(weather_hourly_data["location"]),
                "precipitation_value_24h": list_2_listStr(
                    [item["value"] for item in hourly["precipitation"]]
                ),
                "precipitation_probability_24h": list_2_listStr(
                    [item["probability"] for item in hourly["precipitation"]]
                ),
                "temperature_24h": list_2_listStr(
                    [item["value"] for item in hourly["temperature"]]
                ),
                "apparent_temperature_24h": list_2_listStr(
                    [item["value"] for item in hourly["apparent_temperature"]]
                ),
                "wind_speed_24h": list_2_listStr(
                    [item["speed"] for item in hourly["wind"]]
                ),
                "wind_direction_24h": list_2_listStr(
                    [item["direction"] for item in hourly["wind"]]
                ),
                "humidity_24h": list_2_listStr(
                    [item["value"] for item in hourly["humidity"]]
                ),
                "cloudrate_24h": list_2_listStr(
                    [item["value"] for item in hourly["cloudrate"]]
                ),
                "skycon_24h": list_2_listStr(
                    [item["value"] for item in hourly["skycon"]]
                ),
                "pressure_24h": list_2_listStr(
                    [item["value"] for item in hourly["pressure"]]
                ),
                "visibility_24h": list_2_listStr(
                    [item["value"] for item in hourly["visibility"]]
                ),
                "dswrf_24h": list_2_listStr(
                    [item["value"] for item in hourly["dswrf"]]
                ),
                "aqi_24h": list_2_listStr(
                    [item["value"]["chn"] for item in hourly["air_quality"]["aqi"]]
                ),
                "pm25_24h": list_2_listStr(
                    [item["value"] for item in hourly["air_quality"]["pm25"]]
                ),
                "description": hourly["description"],
                "primary": result["primary"],
                "forecast_keypoint": result["forecast_keypoint"],
            }

            try:
                WeatherHourlySchema.model_validate(weather_hourly)
            except ValidationError as e:
                logger.error(f"Validation error: {e}")
                return
            else:
                with db_session() as session:
                    data = WeatherHourly(**weather_hourly)
                    session.add(data)

                    session.commit()
    except Exception as e:
        logger.error(f"Save data by hourly failed: {e}")


def save_data_by_minutely_in_database(weather_minutely_data):

    # delete_expired_weather_data(db, WeatherMinutely)

    try:
        result = weather_minutely_data["result"]
        if result:
            minutely = result["minutely"] or {}
            weather_minutely = {
                "location": list_2_listStr(weather_minutely_data["location"]),
                "precipitation_2h": list_2_listStr(minutely["precipitation_2h"]),
                "precipitation": list_2_listStr(minutely["precipitation"]),
                "probability": list_2_listStr(minutely["probability"]),
                "description": minutely["description"],
                "primary": result["primary"],
                "forecast_keypoint": result["forecast_keypoint"],
            }

            try:
                WeatherMinutelySchema.model_validate(weather_minutely)
            except ValidationError as e:
                logger.error(f"Validation error: {e}")
                return
            else:
                with db_session() as session:
                    data = WeatherMinutely(**weather_minutely)
                    session.add(data)

                    session.commit()
    except Exception as e:
        logger.error(f"Save data by minutely failed: {e}")
