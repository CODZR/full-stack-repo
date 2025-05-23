from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase


weather_router = APIRouter(tags=["Weather"])
weather_minutely_crud = CRUDBase(model=models.WeatherMinutely)
weather_hourly_crud = CRUDBase(model=models.WeatherHourly)


@weather_router.get("/weathers/hourly")
def list_weathers(db: Session = Depends(get_db)) -> schemas.WeatherHourlySchema:
    db_weather = weather_hourly_crud.get_first(db)
    if db_weather:
        return db_weather
    else:
        raise HTTPException(status_code=404, detail="No weather data found")


@weather_router.get("/weathers/minutely")
def list_weathers(db: Session = Depends(get_db)) -> schemas.WeatherMinutelySchema:
    db_weather = weather_minutely_crud.get_first(db)
    if db_weather:
        return db_weather
    else:
        raise HTTPException(status_code=404, detail="No weather data found")
