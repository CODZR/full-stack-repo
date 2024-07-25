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

            first_hour_datetime = hourly["precipitation"][0]["datetime"]

            if first_hour_datetime:
                weather_hourly = {
                    "location": list_2_listStr(weather_hourly_data["location"]),
                    "first_hour_datetime": first_hour_datetime,
                    "precipitation_value_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["precipitation"]]
                    ),
                    "precipitation_probability_in_48h": list_2_listStr(
                        [item["probability"] for item in hourly["precipitation"]]
                    ),
                    "temperature_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["temperature"]]
                    ),
                    "apparent_temperature_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["apparent_temperature"]]
                    ),
                    "wind_speed_in_48h": list_2_listStr(
                        [item["speed"] for item in hourly["wind"]]
                    ),
                    "wind_direction_in_48h": list_2_listStr(
                        [item["direction"] for item in hourly["wind"]]
                    ),
                    "humidity_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["humidity"]]
                    ),
                    "cloudrate_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["cloudrate"]]
                    ),
                    "skycon_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["skycon"]]
                    ),
                    "pressure_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["pressure"]]
                    ),
                    "visibility_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["visibility"]]
                    ),
                    "dswrf_in_48h": list_2_listStr(
                        [item["value"] for item in hourly["dswrf"]]
                    ),
                    "aqi_in_48h": list_2_listStr(
                        [item["value"]["chn"] for item in hourly["air_quality"]["aqi"]]
                    ),
                    "pm25_in_48h": list_2_listStr(
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
        else:
            logger.error("Lack weather data in hourly response")
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
                "precipitation_in_2h": list_2_listStr(minutely["precipitation_2h"]),
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
