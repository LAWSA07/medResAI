"""
API router configuration.
"""
from fastapi import APIRouter

from app.api.endpoints import predict

api_router = APIRouter()

# Add prediction endpoints with prefix
api_router.include_router(predict.router, prefix="/predict", tags=["predictions"])