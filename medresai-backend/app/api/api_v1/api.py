from fastapi import APIRouter  
  
# Create API router  
api_router = APIRouter()  
  
# Import and include endpoint routers  
# from .endpoints import users, auth  
from .endpoints import predictions  
# api_router.include_router(users.router, prefix="/users", tags=["users"])  
# api_router.include_router(auth.router, prefix="/auth", tags=["auth"])  
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"]) 
