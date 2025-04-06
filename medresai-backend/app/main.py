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
from app.api.api import api_router

# Create FastAPI app
app = FastAPI(
    title="MedResAI API",
    description="API for antiviral drug candidate prediction using deep learning",
    version="1.0.0"
)

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "http://localhost:5179",
    "http://localhost:5180",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",
    "http://127.0.0.1:5176",
    "http://127.0.0.1:5177",
    "http://127.0.0.1:5178",
    "http://127.0.0.1:5179",
    "http://127.0.0.1:5180",
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
async def root():
    return {"message": "Welcome to MedResAI API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Preload model on startup
@app.on_event("startup")
async def startup_event():
    try:
        from app.ml.model_loader import model_service
        logger.info("Preloading model...")
        model_service.load_model()
        logger.info("Model preloaded successfully")
    except Exception as e:
        logger.error(f"Error preloading model: {str(e)}")
        logger.error("The application will load the model on the first prediction request")