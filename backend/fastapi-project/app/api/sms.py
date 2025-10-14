"""
Dify Webhook to Aliyun SMS Gateway
Enterprise-grade FastAPI service for processing Dify notifications and sending SMS alerts
"""

from fastapi import APIRouter, Request, HTTPException, Depends, logger, status
from fastapi.security import APIKeyHeader
from app.core.config import settings

from app.schemas.sms import DifyWebhookPayload, SMSErrorResponse, SMSResponse
from app.services.sms import AliyunSMSService


# API 密钥验证
api_key_header = APIKeyHeader(name="X-API-KEY")


sms_router = APIRouter(tags=["Sms"])


async def verify_api_key(api_key: str = Depends(api_key_header)):
    """验证API密钥"""
    if api_key != settings.DIFY_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API Key"
        )
    return api_key


# --------------------------
# 路由和业务逻辑
# --------------------------
@sms_router.post("/sms/dify-webhook", response_model=SMSResponse)
async def handle_dify_webhook(
    payload: DifyWebhookPayload,
    request: Request,
    api_key: str = Depends(verify_api_key),
):
    try:
        print(f"Received Dify webhook: {payload.model_dump()}")

        # sms_content = f"你好，请查看新订单: {payload.conversation_id[:8]}"

        sms_service = AliyunSMSService()
        response = await sms_service.send_sms(payload.conversation_id, payload.phone)

        # 3. 检查响应状态
        if response.code != "OK":
            error_detail = SMSErrorResponse(
                error_code=response.code,
                error_message=response.message,
                request_id=response.request_id,
            )
            print(f"SMS send failed: {error_detail.model_dump()}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_detail.model_dump(),
            )

        print(f"SMS sent successfully. Request ID: {response.request_id}")
        return response

    except HTTPException:
        raise  # 直接抛出已有的HTTP异常
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error_code": "INTERNAL_ERROR", "error_message": "服务器内部错误"},
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
