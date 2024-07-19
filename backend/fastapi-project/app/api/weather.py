from typing import List
from fastapi import APIRouter, HTTPException, Response, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.logger import logger
from app import models, schemas
from app.db.base import get_db
from app.db.crud import CRUDBase
from app.services.oauth2 import get_current_user


weather_router = APIRouter(tags=["Weather"])
weather_crud = CRUDBase(model=models.Weather)


@weather_router.get("/weathers/hourly")
def list_weathers(db: Session = Depends(get_db)) -> schemas.WeatherHourly:
    db_weather = weather_crud.get_first(db)
    if db_weather:
        return db_weather
    else:
        raise HTTPException(status_code=404, detail="No weather data found")


@weather_router.get("/weathers/minutely")
def list_weathers(db: Session = Depends(get_db)) -> schemas.WeatherMinutely:
    db_weather = weather_crud.get_first(db)
    if db_weather:
        return db_weather
    else:
        raise HTTPException(status_code=404, detail="No weather data found")
