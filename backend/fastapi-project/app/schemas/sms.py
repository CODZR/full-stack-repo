from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict


class SMSResponse(BaseModel):
    """短信发送响应模型 (Pydantic 2.x 语法)"""

    model_config = ConfigDict(extra="forbid")  # 禁止额外字段

    request_id: str = Field(..., description="阿里云请求ID")
    code: str = Field(..., description="API响应码")
    message: str = Field(..., description="API返回消息")
    biz_id: Optional[str] = Field(None, description="业务ID")


class DifyWebhookPayload(BaseModel):
    """Dify Webhook 数据模型 (Pydantic 2.x 语法)"""

    model_config = ConfigDict(extra="forbid")  # 禁止额外字段

    event_type: Optional[str] = Field(
        default=None,
        description="事件类型",
        examples=["message_created", "conversation_updated"],
    )

    content: Optional[str] = Field(default=None, description="消息内容", max_length=500)

    conversation_id: Optional[str] = Field(
        default=None, description="会话ID", pattern=r"^[a-zA-Z0-9_-]+$"
    )

    timestamp: Optional[datetime] = Field(
        default=None, description="时间戳", json_schema_extra={"format": "date-time"}
    )

    user_id: Optional[str] = Field(
        default=None, description="用户ID", min_length=1, max_length=64
    )

    metadata: Optional[dict] = Field(
        default=None,
        description="附加元数据",
        json_schema_extra={"example": {"key": "value"}},
    )

    @field_validator("timestamp", mode="before")
    @classmethod
    def validate_timestamp(cls, value: str | datetime) -> datetime:
        """验证时间戳格式 (Pydantic 2.x 语法)"""
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value)
            except ValueError as e:
                raise ValueError(f"Invalid timestamp format: {value}") from e
        return value
