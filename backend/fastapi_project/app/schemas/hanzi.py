from typing import Optional, Text

from pydantic import UUID4, BaseModel


from app.schemas.base import IDSchema


# Shared properties
class HanziBasic(BaseModel):
    zi: str = None
    pinyin: str = None
    bushou: str = None
    bushoubh: Optional[int] = None
    zbh: Optional[int] = None
    kxzdbh: Optional[int] = None
    wb86: Optional[str] = None
    wb98: Optional[str] = None
    unicode: Optional[str] = None
    hzwx: Optional[str] = None
    jxyy: Optional[str] = None
    cyz: Optional[str] = None
    xmx: Optional[str] = None
    bsdx: Optional[str] = None
    jbjs: Optional[Text] = None
    xhzdxxjs: Optional[Text] = None
    hydzdjs: Optional[Text] = None
    kxzdjs: Optional[Text] = None
    swjzxj: Optional[Text] = None
    swjzxjpic: Optional[str] = None
    zyybpic: Optional[str] = None
    xgsf: Optional[Text] = None
    xgcy: Optional[Text] = None
    xgchengyu: Optional[Text] = None
    xgsc: Optional[Text] = None
    kxzdpic: Optional[str] = None


class HanziList(HanziBasic, IDSchema):
    class Config:
        from_attributes = True


class HanziCreate(HanziBasic):
    class Config:
        from_attributes = True


class HanziDetails(HanziBasic, IDSchema):
    class Config:
        from_attributes = True


class HanziUpdate(HanziBasic):

    class Config:
        extra = "forbid"
        from_attributes = True
