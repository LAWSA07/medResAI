import logging
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.db.init_db import init_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.prediction import PredictionJob
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./medresai.db")

# Create database engine
engine = create_engine(DATABASE_URL)

# Create all tables
Base.metadata.create_all(bind=engine)

# Create SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    db = SessionLocal()
    try:
        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating database tables: {e}")
    finally:
        db.close()

def init() -> None:
    db = SessionLocal()
    try:
        # Create tables
        logger.info("Creating tables...")
        Base.metadata.create_all(bind=engine)

        # Initialize data
        logger.info("Initializing data...")
        init_db()

        logger.info("Database initialized successfully")
    finally:
        db.close()


def main() -> None:
    logger.info("Creating database tables and initializing data")
    init()
    logger.info("Done")


if __name__ == "__main__":
    print("Creating initial database...")
    init_db()