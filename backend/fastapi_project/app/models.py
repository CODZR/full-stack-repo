from datetime import datetime, timedelta
import uuid
from sqlalchemy import (
    UUID,
    Boolean,
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


# Database model, database table inferred from class name
class Faq(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "faqs"
    __table_args__ = {"extend_existing": True}

    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    user = relationship("User", back_populates="faqs")


class User(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    full_name = Column(String(50), index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    organization_name = Column(String(256), nullable=False)
    organizational_role = Column(String(256), nullable=True)
    role = Column(String(256), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    invited_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)

    blogs = relationship("Blog", back_populates="user")
    invitations = relationship("Invitation", back_populates="created_by")


class Blog(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "blogs"
    __table_args__ = {"extend_existing": True}

    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    title = Column(String(100), unique=True, index=True, nullable=False)
    sub_title = Column(String(100), unique=True, index=True)
    author = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    body = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="blogs")


class CasbinRule(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "casbin_rule"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, autoincrement=True)
    ptype = Column(String(255))
    v0 = Column(String(255))
    v1 = Column(String(255))
    v2 = Column(String(255))
    v3 = Column(String(255))
    v4 = Column(String(255))
    v5 = Column(String(255))


class Invitation(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "invitations"
    __table_args__ = {"extend_existing": True}

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    full_name = Column(String(150), nullable=False)
    email = Column(String(100), nullable=False, index=True)
    organization = Column(String(100), nullable=False)
    organizational_role = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    status = Column(String(100), nullable=False, default="Invited")
    unique_token = Column(String, nullable=False, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    resent_count = Column(Integer, default=0)
    created_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    created_by = relationship("User", back_populates="invitations")

    @property
    def expires_at(self):
        return self.updated_at + timedelta(hours=Settings.INVITATION_URL_MAX_AGE)


class Role(DeclarativeBase, IDMixin, TimestampMixin):
    __tablename__ = "roles"
    __table_args__ = {"extend_existing": True}

    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    name = Column(String(32), nullable=False, unique=True)
    description = Column(String(128), nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(
        DateTime, nullable=False, default=datetime.now, onupdate=datetime.now
    )
