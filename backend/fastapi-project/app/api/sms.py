"""
Dify Webhook to Aliyun SMS Gateway
Enterprise-grade FastAPI service for processing Dify notifications and sending SMS alerts
"""

from fastapi import APIRouter, Request, HTTPException, Depends, logger, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from app.core.config import settings

from app.schemas.sms import DifyWebhookPayload, SMSResponse
from app.services.sms import AliyunSMSService


# API 密钥验证
api_key_header = APIKeyHeader(name="X-API-KEY")


sms_router = APIRouter(tags=["Hanzi"])


async def verify_api_key(api_key: str = Depends(api_key_header)):
    """验证API密钥"""
    if api_key != settings.API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key"
        )
    return api_key


# --------------------------
# 路由和业务逻辑
# --------------------------
@sms_router.post("/dify-webhook", response_model=SMSResponse)
async def handle_dify_webhook(
    payload: DifyWebhookPayload,
    request: Request,
    api_key: str = Depends(verify_api_key),
):
    """
    处理Dify平台的Webhook请求并发送短信通知

    Parameters:
    - payload: Dify平台发送的Webhook数据
    - request: FastAPI请求对象
    - api_key: 验证的API密钥

    Returns:
    - 阿里云短信发送结果
    """
    try:
        logger.info(f"Received Dify webhook: {payload.dict()}")

        # 构造短信内容
        sms_content = f"Dify通知-会话:{payload.conversation_id[:8]}... 内容:{payload.content[:20]}..."

        # 发送短信
        sms_service = AliyunSMSService()
        response = await sms_service.send_sms(sms_content)

        logger.info(f"SMS sent successfully: {response.dict()}")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


# # --------------------------
# # 错误处理中间件
# # --------------------------
# @app.exception_handler(Exception)
# async def global_exception_handler(request: Request, exc: Exception):
#     """全局异常处理"""
#     logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
#     return JSONResponse(
#         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         content={"detail": "Internal Server Error"},
#     )
