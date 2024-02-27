from fastapi import APIRouter

from app.api import faq, login, user

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(user.router, prefix="/users", tags=["users"])
api_router.include_router(faq.router, prefix="/faqs", tags=["faqs"])
