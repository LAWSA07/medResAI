from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import os
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Import API router
from app.api.api_v1.api import api_router

# Make sure models are imported via the base_class_registry
import app.db.base_class_registry  # noqa

# Create FastAPI app
app = FastAPI(
    title="MedResAI API",
    description="API for medical research AI predictions",
    version="0.1.0",
)

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    os.getenv("FRONTEND_URL", ""),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the MedResAI API",
        "docs": "/docs",
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}