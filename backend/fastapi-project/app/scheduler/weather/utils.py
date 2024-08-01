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


def get_compass_direction(degree):
    directions = [
        ("N", (0, 11.25)),
        ("NNE", (11.26, 33.75)),
        ("NE", (33.76, 56.25)),
        ("ENE", (56.26, 78.75)),
        ("E", (78.76, 101.25)),
        ("ESE", (101.26, 123.75)),
        ("SE", (123.76, 146.25)),
        ("SSE", (146.26, 168.75)),
        ("S", (168.76, 191.25)),
        ("SSW", (191.26, 213.75)),
        ("SW", (213.76, 236.25)),
        ("WSW", (236.26, 258.75)),
        ("W", (258.76, 281.25)),
        ("WNW", (281.26, 303.75)),
        ("NW", (303.76, 326.25)),
        ("NNW", (326.26, 348.75)),
    ]

    if degree < 0 or degree > 360:
        raise ValueError("Degree should be between 0 and 360.")

    direction = None
    for d in directions:
        if d[1][0] <= degree <= d[1][1]:
            direction = d[0]
            break

    if not direction:
        return "N"
    return direction


def get_wind_level(wind_velocity):
    forces = [
        (0, (0, 1)),
        (1, (1, 6)),
        (2, (6, 12)),
        (3, (12, 20)),
        (4, (20, 29)),
        (5, (29, 39)),
        (6, (39, 50)),
        (7, (50, 62)),
        (8, (62, 75)),
        (9, (75, 89)),
        (10, (89, 103)),
        (11, (103, 118)),
        (12, (118, 134)),
        (13, (134, 150)),
        (14, (150, 167)),
        (15, (167, 184)),
        (16, (184, 202)),
        (17, (202, 220)),
    ]

    if wind_velocity < 0:
        raise ValueError("Wind velocity should be positive.")

    force = None
    for f in forces:
        if f[1][0] <= wind_velocity < f[1][1]:
            force = f[0]
            break

    if not force:
        return 17
    return force


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
                        [get_wind_level(item["speed"]) for item in hourly["wind"]]
                    ),
                    "wind_direction_in_48h": list_2_listStr(
                        [
                            get_compass_direction(item["direction"])
                            for item in hourly["wind"]
                        ]
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
        try:
            if result["forecast_keypoint"]:
                minutely = result["minutely"]
                weather_minutely = {
                    "location": list_2_listStr(weather_minutely_data["location"]),
                    "precipitation_in_2h": list_2_listStr(minutely["precipitation_2h"]),
                    "precipitation": list_2_listStr(minutely["precipitation"]),
                    "probability": list_2_listStr(minutely["probability"]),
                    "description": minutely["description"],
                    "primary": result["primary"],
                    "forecast_keypoint": result["forecast_keypoint"],
                }
        except KeyError:
            weather_minutely = {
                "location": list_2_listStr(weather_minutely_data["location"]),
                "primary": result["primary"],
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
