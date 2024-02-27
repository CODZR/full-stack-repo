from typing import Union


from app.db.base_class import ModelBase


# JSON payload containing access token
class Token(ModelBase):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(ModelBase):
    sub: Union[int, None] = None
