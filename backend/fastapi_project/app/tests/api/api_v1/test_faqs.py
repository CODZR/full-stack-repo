from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.config import settings
from app.tests.utils.faq import create_random_faq


def test_create_faq(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    data = {"title": "Foo", "description": "Fighters"}
    response = client.post(
        f"{settings.API_V1_STR}/faqs/",
        headers=superuser_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == data["title"]
    assert content["description"] == data["description"]
    assert "id" in content
    assert "owner_id" in content


def test_read_faq(
    client: TestClient, superuser_token_headers: dict, db: Session
) -> None:
    faq = create_random_faq(db)
    response = client.get(
        f"{settings.API_V1_STR}/faqs/{faq.id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == faq.title
    assert content["description"] == faq.description
    assert content["id"] == faq.id
    assert content["owner_id"] == faq.owner_id
