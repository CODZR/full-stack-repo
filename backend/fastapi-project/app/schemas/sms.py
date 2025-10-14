from datetime import datetime
import re
from typing import Dict, Optional
from pydantic import BaseModel, Field, field_validator, ConfigDict


class SMSResponse(BaseModel):
    """短信发送响应模型 (Pydantic 2.x 语法)"""

    model_config = ConfigDict(extra="forbid")  # 禁止额外字段

    request_id: str = Field(..., description="阿里云请求ID")
    code: str = Field(..., description="API响应码")
    message: str = Field(..., description="API返回消息")
    biz_id: Optional[str] = Field(None, description="业务ID")


class SMSErrorResponse(BaseModel):
    error_code: str
    error_message: str
    request_id: str | None = None


class DifyWebhookPayload(BaseModel):
    """
    Dify 平台 Webhook 数据模型 (Pydantic 2.x)
    专为短信通知场景优化
    """

    model_config = ConfigDict(
        extra="forbid",  # 禁止额外字段
        json_schema_extra={
            "example": {
                "event_type": "message_created",
                "content": "您有新订单 #12345",
                "conversation_id": "conv_abc123",
                "timestamp": "2023-11-25T14:30:00Z",
                "user_id": "user_789",
                "metadata": {"order_id": "12345"},
            }
        },
    )

    event_type: Optional[str] = Field(
        default=None,
        description="事件类型",
        examples=["message_created", "conversation_updated"],
        json_schema_extra={"max_length": 50},
    )

    content: Optional[str] = Field(
        default=None,
        description="消息内容（将用于短信正文）",
        max_length=500,
        pattern=r"^[\s\S]*$",  # 允许多行和特殊字符
    )

    conversation_id: Optional[str] = Field(
        default=None,
        description="会话ID（将用于短信标识）",
        pattern=r"^[a-zA-Z0-9_-]{1,64}$",  # 更严格的格式控制
        json_schema_extra={"example": "conv_abc123"},
    )

    phone: Optional[str] = Field(
        default=None,
        description="客户电话",
        pattern=r"^[0-9_-]{1,16}$",  # 更严格的格式控制
        json_schema_extra={"example": "1888888888"},
    )

    timestamp: Optional[datetime] = Field(
        default=None,
        description="ISO 8601 格式时间戳",
        json_schema_extra={"format": "date-time"},
    )

    user_id: Optional[str] = Field(
        default=None,
        description="用户ID",
        min_length=1,
        max_length=64,
        pattern=r"^[a-zA-Z0-9_-]+$",
    )

    metadata: Optional[Dict[str, str]] = Field(
        default=None,
        description="附加元数据（可用于短信模板变量）",
        json_schema_extra={"example": {"order_id": "12345", "priority": "high"}},
    )

    @field_validator("timestamp", mode="before")
    @classmethod
    def validate_timestamp(cls, value: str | datetime) -> datetime:
        """统一时间戳格式"""
        if isinstance(value, str):
            try:
                # 支持带时区和无时区格式
                if "Z" in value:
                    return datetime.fromisoformat(value.replace("Z", "+00:00"))
                return datetime.fromisoformat(value)
            except ValueError as e:
                raise ValueError(f"Invalid ISO 8601 format: {value}") from e
        return value

    @field_validator("content", mode="before")
    @classmethod
    def sanitize_content(cls, value: Optional[str]) -> Optional[str]:
        """内容净化处理（防止XSS/注入）"""
        if value is None:
            return None
        # 移除危险字符（根据业务需求调整）
        return re.sub(r"[<>\"']", "", value.strip())
