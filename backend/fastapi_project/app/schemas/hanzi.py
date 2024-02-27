from typing import Optional

from pydantic import BaseModel
from sqlalchemy import Text


# Shared properties
class HanziBase(BaseModel):
    zi: Optional[str] = None
    pinyin: Optional[str] = None
    bushou: Optional[str] = None
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
    bsdx: Optional[Text] = None
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


# Properties to receive on hanzi creation
class HanziCreate(HanziBase):
    title: str


# Properties to receive on hanzi update
class HanziUpdate(HanziBase):
    pass


# Properties shared by models stored in DB
class HanziInDBBase(HanziBase):
    id: int
    title: str
    user_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Hanzi(HanziInDBBase):
    pass


# Properties properties stored in DB
class HanziInDB(HanziInDBBase):
    pass
