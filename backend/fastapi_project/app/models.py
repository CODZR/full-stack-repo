from datetime import datetime, timedelta
import uuid
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    func,
)
from core.config import Settings


from app.db.base_class import DeclarativeBase, IDMixin, TimestampMixin
from sqlalchemy.orm import relationship


class User(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "user"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), index=True, nullable=False)
    role = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    blogs = relationship("Blog", back_populates="user")


class Blog(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "blog"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), unique=True, index=True, nullable=False)
    content = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user_id = Column(Integer, ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="blogs")


# Database model, database table inferred from class name
class Faq(DeclarativeBase, IDMixin):
    __tablename__ = "faq"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)


class Hanzi(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "hanzi"
    __table_args__ = {"extend_existing": True}

    zi = Column(String(64), nullable=False)
    pinyin = Column(String(64), nullable=False)
    bushou = Column(String(64), nullable=False)
    bushoubh = Column(Integer, nullable=False)
    zbh = Column(Integer, nullable=False)
    kxzdbh = Column(Integer, nullable=False)
    wb86 = Column(String(64), nullable=False)
    wb98 = Column(String(64), nullable=False)
    unicode = Column(String(64), nullable=False)
    hzwx = Column(String(255), nullable=False)
    jxyy = Column(String(255), nullable=False)
    cyz = Column(String(255), nullable=False)
    xmx = Column(String(255), nullable=False)
    bsdx = Column(String(255), nullable=False)
    jbjs = Column(Text, nullable=False)
    xhzdxxjs = Column(Text, nullable=False)
    hydzdjs = Column(Text, nullable=False)
    kxzdjs = Column(Text, nullable=False)
    swjzxj = Column(Text, nullable=False)
    swjzxjpic = Column(String(255), nullable=False)
    zyybpic = Column(String(255), nullable=False)
    xgsf = Column(Text, nullable=False)
    xgcy = Column(Text, nullable=False)
    xgchengyu = Column(Text, nullable=False)
    xgsc = Column(Text, nullable=False)
    kxzdpic = Column(String(255), nullable=False)
