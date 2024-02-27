from typing import Optional

from sqlalchemy.orm import Session

from app import crud, models
from app.schemas.faq import FaqCreate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def create_random_faq(db: Session, *, user_id: Optional[int] = None) -> models.Faq:
    if user_id is None:
        user = create_random_user(db)
        user_id = user.id
    title = random_lower_string()
    description = random_lower_string()
    faq_in = FaqCreate(title=title, description=description, id=id)
    return crud.faq.create_with_user(db=db, obj_in=faq_in, user_id=user_id)
