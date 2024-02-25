from sqlalchemy.orm import Session

from app import crud
from app.schemas.faq import FaqCreate, FaqUpdate
from app.tests.utils.user import create_random_user
from app.tests.utils.utils import random_lower_string


def test_create_faq(db: Session) -> None:
    title = random_lower_string()
    description = random_lower_string()
    faq_in = FaqCreate(title=title, description=description)
    user = create_random_user(db)
    faq = crud.faq.create_with_owner(db=db, obj_in=faq_in, owner_id=user.id)
    assert faq.title == title
    assert faq.description == description
    assert faq.owner_id == user.id


def test_get_faq(db: Session) -> None:
    title = random_lower_string()
    description = random_lower_string()
    faq_in = FaqCreate(title=title, description=description)
    user = create_random_user(db)
    faq = crud.faq.create_with_owner(db=db, obj_in=faq_in, owner_id=user.id)
    stored_faq = crud.faq.get(db=db, id=faq.id)
    assert stored_faq
    assert faq.id == stored_faq.id
    assert faq.title == stored_faq.title
    assert faq.description == stored_faq.description
    assert faq.owner_id == stored_faq.owner_id


def test_update_faq(db: Session) -> None:
    title = random_lower_string()
    description = random_lower_string()
    faq_in = FaqCreate(title=title, description=description)
    user = create_random_user(db)
    faq = crud.faq.create_with_owner(db=db, obj_in=faq_in, owner_id=user.id)
    description2 = random_lower_string()
    faq_update = FaqUpdate(description=description2)
    faq2 = crud.faq.update(db=db, db_obj=faq, obj_in=faq_update)
    assert faq.id == faq2.id
    assert faq.title == faq2.title
    assert faq2.description == description2
    assert faq.owner_id == faq2.owner_id


def test_delete_faq(db: Session) -> None:
    title = random_lower_string()
    description = random_lower_string()
    faq_in = FaqCreate(title=title, description=description)
    user = create_random_user(db)
    faq = crud.faq.create_with_owner(db=db, obj_in=faq_in, owner_id=user.id)
    faq2 = crud.faq.remove(db=db, id=faq.id)
    faq3 = crud.faq.get(db=db, id=faq.id)
    assert faq3 is None
    assert faq2.id == faq.id
    assert faq2.title == title
    assert faq2.description == description
    assert faq2.owner_id == user.id
