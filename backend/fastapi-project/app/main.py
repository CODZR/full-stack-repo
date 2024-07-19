import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.logger import logger
from app.db.base import engine

from app.db.base_class import DeclarativeBase

from app.scheduler.weather import weather_scheduler
from app.routes import router as api_router

# from fastapi.staticfiles import StaticFiles


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Started!!")
    DeclarativeBase.metadata.create_all(bind=engine)
    logger.info("DB connected!!")
    yield
    logger.info("Shutdown!!")
    logger.info("DB disconnected!!")


app = FastAPI(lifespan=lifespan, debug=True)

# app.mount("/public", StaticFiles(directory="public"), "public")

origins = [
    "http://localhost:3010",
    "http://localhost:3011",
    "https://dzrlab.top",
    "https://test.dzrlab.top",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    weather_scheduler.start()
    uvicorn.run("main:app", host="0.0.0.0", port=7001)
