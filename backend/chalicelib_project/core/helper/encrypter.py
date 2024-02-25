import base64

from extensions.ext_database import db
from libs import rsa


def obfuscated_token(token: str):
    return token[:6] + "*" * (len(token) - 8) + token[-2:]


def decrypt_token(tenant_id: str, token: str):
    return rsa.decrypt(base64.b64decode(token), tenant_id)
