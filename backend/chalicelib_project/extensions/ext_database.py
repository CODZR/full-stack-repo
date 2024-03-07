from sqlalchemy import URL
from sqlalchemy.ext.declarative import declarative_base
from langchain.vectorstores.pgvector import PGVector
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, configure_mappers

from config import app_config

DeclarativeBase = declarative_base()


# database connection string
PSQL_DATABASE_URL = URL(
    drivername=app_config.DB_DRIVER_NAME,
    host=app_config.DB_HOST,
    port=int(app_config.DB_PORT),
    database=app_config.DB_DATABASE,
    username=app_config.DB_USERNAME,
    password=app_config.DB_PASSWORD,
    query={},
)


# Supabase PGVector store
PGVECTOR_CONNECTION_STRING = PGVector.connection_string_from_db_params(
    driver=app_config.DB_DRIVER,
    host=app_config.DB_HOST,
    port=int(app_config.DB_PORT),
    database=app_config.DB_DATABASE,  # create yourself
    user=app_config.DB_USERNAME,
    password=app_config.DB_PASSWORD,
)


engines = {}


@contextmanager
def db_session():
    """
    Builds and provides a scoped SqlAlchemy session.
    """
    try:
        engine = engines[PSQL_DATABASE_URL]
    except KeyError:
        engine = create_engine(PSQL_DATABASE_URL, pool_recycle=1, pool_size=1, max_overflow=50)
        engines[PSQL_DATABASE_URL] = engine
    configure_mappers()
    session = scoped_session(sessionmaker(bind=engine))

    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.remove()
        session.close()
