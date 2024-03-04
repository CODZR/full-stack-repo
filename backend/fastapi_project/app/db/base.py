from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings


DATABASE_URL = settings.SQLALCHEMY_DATABASE_URI
print(f"row: 7 - col: 1 DATABASE_URL -> {DATABASE_URL}")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():  # Dependency to get database session
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
