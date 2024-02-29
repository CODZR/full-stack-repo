import os
from typing import Any, Dict, Optional, ClassVar
from pydantic import ConfigDict, validator
from pydantic_settings import BaseSettings
from sqlalchemy import URL

from dotenv import load_dotenv

if not os.getenv("POSTGRES_PASSWORD"):
    load_dotenv()


PSQL_DATABASE_URL = URL(
    drivername="postgresql",
    host=os.environ.get("POSTGRES_HOST"),
    port=5432,
    database=os.environ.get("POSTGRES_DATABASE"),
    username=os.environ.get("POSTGRES_USER"),
    password=os.environ.get("POSTGRES_PASSWORD"),
    query={},
)


class Settings(BaseSettings):
    model_config = ConfigDict(case_sensitive=True)

    PROJECT_NAME: str = "Fastapi App"
    APP_ENV: str = os.getenv("APP_ENV", "development")

    # Base URL
    BASE_URL: str = os.getenv("BASE_URL", "")

    # DB
    POSTGRES_HOST: str = os.environ.get("POSTGRES_HOST", "localhost")
    POSTGRES_USER: str = os.environ.get("POSTGRES_USER", "codzr")
    POSTGRES_PASSWORD: str = os.environ.get("POSTGRES_PASSWORD")
    POSTGRES_DATABASE: str = os.environ.get("POSTGRES_DATABASE", "vibe_dbt")
    SQLALCHEMY_DATABASE_URI: str = str(PSQL_DATABASE_URL)

    # JWT
    JWT_SECRET_KEY: str = os.environ.get("JWT_SECRET_KEY", "")
    ALGORITHM: ClassVar = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Rollbar
    ROLLBAR_ACCESS_TOKEN: str = os.environ.get("ROLLBAR_ACCESS_TOKEN", "")

    # client credentials
    # OAUTH_CLIENT_ID: str = os.environ["OAUTH_CLIENT_ID"]
    # OAUTH_CLIENT_SECRET: str = os.environ["OAUTH_CLIENT_SECRET"]

    # send mail credentials
    MAIL_USERNAME: str = os.getenv("MAIL_USERNAME", "")
    MAIL_PASSWORD: str = os.getenv("MAIL_PASSWORD", "")
    MAIL_FROM: str = os.getenv("MAIL_FROM", "andrew@vibe.us")
    MAIL_PORT: int = int(os.getenv("MAIL_PORT", 22))
    MAIL_SERVER: str = os.getenv("MAIL_SERVER", "")
    MAIL_FROM_NAME: str = os.getenv("MAIN_FROM_NAME", "")

    # invitations
    INVITATION_URL_SECRET_KEY: str = os.getenv("INVITATION_URL_SECRET_KEY", "")
    INVITATION_URL_SECURITY_PASSWORD_SALT: str = os.getenv(
        "INVITATION_URL_SECURITY_PASSWORD_SALT", ""
    )
    INVITATION_URL_MAX_AGE: int = os.getenv("INVITATION_URL_MAX_AGE", 1)


settings = Settings()
