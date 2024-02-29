from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings


DATABASE_URL = settings.SQLALCHEMY_DATABASE_URI

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():  # Dependency to get database session
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
