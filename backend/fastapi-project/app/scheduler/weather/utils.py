from datetime import datetime, timedelta
from app.db.base import get_db
from app.schemas.weather import WeatherHourly, WeatherMinutely


def delete_expired_weather_data(db, WeatherSchema):
    one_week_ago = datetime.now() - timedelta(weeks=1)
    expired_data = (
        db.query(WeatherSchema).filter(WeatherSchema.created_at < one_week_ago).all()
    )

    if expired_data:
        for data in expired_data:
            db.delete(data)
        db.commit()


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
    db = get_db()
    print(f"row: 34 - col: 39 weather_minutely_data -> {weather_minutely_data}")

    delete_expired_weather_data(db, WeatherMinutely)

    result = weather_minutely_data["result"]

    if result:
        minutely = result["minutely"] or {}
        weather_minutely = {
            "location": result["location"],
            "precipitation_2h": minutely["precipitation_2h"],
            "precipitation": minutely["precipitation"],
            "probability": minutely["probability"],
            "description": minutely["description"],
            "primary": result["primary"],
            "forecast_keypoint": result["forecast_keypoint"],
        }

        db.add(WeatherMinutely(weather_minutely))

    db.commit()
