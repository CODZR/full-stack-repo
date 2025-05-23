import os
import time
import requests

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger


from app.core.logger import logger
from .helper import save_data_by_hourly_in_database, save_data_by_minutely_in_database

weather_scheduler = BackgroundScheduler()
longitude = "120.00"
latitude = "30.28"

API_BASE_URL = (
    f"https://api.caiyunapp.com/v2.6/TAkhjf8d1nlSlspN/{longitude},{latitude}/"
)
CAI_YUN_API_TOKEN = os.getenv("CAI_YUN_TOKEN")
MAX_RETRY = 3


def hourly_weather_scheduler():
    logger.info("hourly_weather_scheduler Started")
    retry_times = 0
    while retry_times <= MAX_RETRY:
        try:
            hourly_api_url = (
                API_BASE_URL + f"hourly?hourlysteps=48&token={CAI_YUN_API_TOKEN}"
            )
            hourly_data = requests.get(hourly_api_url).json()
            save_data_by_hourly_in_database(hourly_data)
            break
        except Exception:
            logger.error("weather_by_day_scheduler failed")
            retry_times += 1
            time.sleep(retry_times)
            continue


def minutely_weather_scheduler():
    logger.info("minutely_weather_scheduler Started")
    retry_times = 0
    while retry_times <= MAX_RETRY:
        try:
            minutely_api_url = API_BASE_URL + f"minutely?token={CAI_YUN_API_TOKEN}"
            minutely_data = requests.get(minutely_api_url).json()
            save_data_by_minutely_in_database(minutely_data)
            break
        except Exception:
            logger.error("weather_by_day_scheduler failed")
            retry_times += 1
            time.sleep(retry_times)
            continue


weather_scheduler.add_job(hourly_weather_scheduler, CronTrigger(hour=6, minute=0))
weather_scheduler.add_job(minutely_weather_scheduler, "interval", minutes=60)
weather_scheduler.start()
minutely_weather_scheduler()
hourly_weather_scheduler()
