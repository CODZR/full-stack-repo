from alibabacloud_tea_util.client import Client as UtilClient
from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field, validator


class SMSResponse(BaseModel):
    """短信发送响应模型"""

    request_id: str
    code: str
    message: str
    biz_id: Optional[str] = None


class SMSResponse(BaseModel):
    """短信发送响应模型"""

    request_id: str
    code: str
    message: str
    biz_id: Optional[str] = None


# --------------------------
# 数据模型定义
# --------------------------
class DifyWebhookPayload(BaseModel):
    """Dify Webhook 数据模型"""

    event_type: str = Field(..., description="事件类型")
    content: str = Field(..., description="消息内容")
    conversation_id: str = Field(..., description="会话ID")
    timestamp: datetime = Field(..., description="时间戳")
    user_id: Optional[str] = Field(None, description="用户ID")
    metadata: Optional[dict] = Field(None, description="附加元数据")

    @validator("timestamp")
    def validate_timestamp(cls, value):
        """验证时间戳格式"""
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value)
            except ValueError:
                raise ValueError("Invalid timestamp format")
        return value


class SMSResponse(BaseModel):
    """短信发送响应模型"""

    request_id: str
    code: str
    message: str
    biz_id: Optional[str] = None
