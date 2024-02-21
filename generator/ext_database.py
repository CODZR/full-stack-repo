from contextlib import contextmanager

from sqlalchemy import URL, create_engine, scoped_session, sessionmaker
from sqlalchemy.orm import configure_mappers
import os

POSTGRES_DATABASE_URL = URL(
    drivername='postgresql+psycopg2',
    username=os.environ["POSTGRES_USER"],
    password=os.environ["POSTGRES_PASSWORD"],
    host=os.environ["POSTGRES_HOST"],
    port=int("5432"),
    database=os.environ["POSTGRES_DATABASE"],
    query={},
)

engines = {}

@contextmanager
def db_session():
    """
    Builds and provides a scoped SqlAlchemy session for PostgreSQL database.
    """
    try:
        engine = engines[POSTGRES_DATABASE_URL]
    except KeyError:
        engine = create_engine(POSTGRES_DATABASE_URL, pool_recycle=1, pool_size=1, max_overflow=50)
        engines[POSTGRES_DATABASE_URL] = engine
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