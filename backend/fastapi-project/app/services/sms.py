from fastapi import HTTPException, logger, status

from app.core.config import settings
from alibabacloud_dysmsapi20170525.client import Client as Dysmsapi20170525Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_dysmsapi20170525 import models as dysmsapi_models
from alibabacloud_tea_util import models as util_models

from app.schemas.sms import SMSResponse


# --------------------------
# 阿里云短信服务工具类
# --------------------------
class AliyunSMSService:
    """阿里云短信服务封装"""

    def __init__(self):
        self.client = self._create_client()

    def _create_client(self) -> Dysmsapi20170525Client:
        """创建阿里云短信客户端"""
        config_openapi = open_api_models.Config(
            access_key_id=settings.ALIYUN_ACCESS_KEY_ID,
            access_key_secret=settings.ALIYUN_ACCESS_KEY_SECRET,
            endpoint=settings.ALIYUN_SMS_ENDPOINT,
        )
        return Dysmsapi20170525Client(config_openapi)

    async def send_sms(self, content: str) -> SMSResponse:
        """
        发送短信
        :param content: 短信内容
        :return: 发送结果
        """
        send_sms_request = dysmsapi_models.SendSmsRequest(
            phone_numbers=settings.ALIYUN_SMS_PHONE_NUMBER,
            sign_name=settings.ALIYUN_SMS_SIGN_NAME,
            template_code=settings.ALIYUN_SMS_TEMPLATE_CODE,
            template_param=f'{{"content":"{content}"}}',
        )

        runtime = util_models.RuntimeOptions()

        try:
            response = await self.client.send_sms_with_options_async(
                send_sms_request, runtime
            )
            return SMSResponse(
                request_id=response.body.request_id,
                code=response.body.code,
                message=response.body.message,
                biz_id=response.body.biz_id,
            )
        except Exception as e:
            logger.error(f"Aliyun SMS send failed: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to send SMS",
            )
