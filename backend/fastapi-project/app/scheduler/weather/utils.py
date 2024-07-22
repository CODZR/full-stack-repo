from datetime import datetime, timedelta

from pydantic import ValidationError
from app.core.logger import logger
from app.db.base import db_session, get_db
from app.models import WeatherMinutely
from app.schemas.weather import WeatherMinutelySchema
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
    db = get_db()

    # delete_expired_weather_data(db, WeatherHourly)

    # current_time = datetime.now()
    # expired_data = (
    #     db.query(WeatherHourly).filter(WeatherHourly.created_at < current_time).all()
    # )

    # for weather_hourly in expired_data:
    #     db.delete(weather_hourly)

    # db.commit()


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
