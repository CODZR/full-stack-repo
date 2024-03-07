# -*- coding:utf-8 -*-
import os

from dotenv import load_dotenv


load_dotenv()

DEFAULTS = {
    "DB_DRIVER_NAME": "postgresql",
    "DB_DRIVER": "psycopg2",
    "DB_USERNAME": "postgres",
    "DB_PASSWORD": "",
    "DB_HOST": "localhost",
    "DB_PORT": "5432",
    "DB_DATABASE": "vira",
    # "REDIS_HOST": "localhost",
    # "REDIS_PORT": "6379",
    # "REDIS_DB": "0",
    # "REDIS_USE_SSL": "False",
    "STORAGE_TYPE": "local",
    "STORAGE_LOCAL_PATH": "storage",
    "SQLALCHEMY_POOL_SIZE": 30,
    "SQLALCHEMY_POOL_RECYCLE": 3600,
    "SQLALCHEMY_ECHO": "False",
    "LOG_LEVEL": "INFO",
}


def get_env(key):
    return os.environ.get(key, DEFAULTS.get(key))


def get_bool_env(key):
    return get_env(key).lower() == "true"


class Config:
    """Application configuration class."""

    def __init__(self):
        # ------------------------
        # General Configurations.
        # ------------------------
        self.CURRENT_VERSION = "0.0.1"
        self.TESTING = False
        self.LOG_LEVEL = get_env("LOG_LEVEL")

        # ------------------------
        # Database Configurations.
        # ------------------------
        db_credentials = [
            "DB_DRIVER_NAME",
            "DB_DRIVER",
            "DB_USERNAME",
            "DB_PASSWORD",
            "DB_HOST",
            "DB_PORT",
            "DB_DATABASE",
        ]
        for key in db_credentials:
            setattr(self, key, get_env(key))

        # ------------------------
        # Redis Configurations.
        # ------------------------
        # self.REDIS_HOST = get_env("REDIS_HOST")
        # self.REDIS_PORT = get_env("REDIS_PORT")
        # self.REDIS_USERNAME = get_env("REDIS_USERNAME")
        # self.REDIS_PASSWORD = get_env("REDIS_PASSWORD")
        # self.REDIS_DB = get_env("REDIS_DB")
        # self.REDIS_USE_SSL = get_bool_env("REDIS_USE_SSL")

        # ------------------------
        # Vector Store Configurations.
        # Currently, only support: qdrant, milvus, zilliz, weaviate
        # ------------------------
        # self.VECTOR_STORE = get_env("VECTOR_STORE")


app_config = Config()
