from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from app.core.config import settings


DATABASE_URL = settings.SQLALCHEMY_DATABASE_URI

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():  # Dependency to get database session
    session = SessionLocal()
    try:
        yield session
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


@contextmanager
def db_session():
    """
    Builds and provides a scoped SqlAlchemy session.
    """
    session = scoped_session(sessionmaker(bind=engine))

    try:
        yield session
        session.commit()
    except Exception as e:
        print(f"db_session e -> {e}")
        session.rollback()
        raise e
    finally:
        session.remove()
        session.close()
