import datetime
import datetime
from typing import List

from pydantic import BaseModel, ConfigDict


def list_2_listStr(list: List) -> str:
    return ",".join(str(x) for x in list) if isinstance(list, List) else list


def convert_datetime_to_realworld(dt: datetime.datetime) -> str:
    return dt.replace(tzinfo=datetime.timezone.utc).isoformat().replace("+00:00", "Z")


def convert_field_to_camel_case(string: str) -> str:
    return "".join(
        word if index == 0 else word.capitalize()
        for index, word in enumerate(string.split("_"))
    )
