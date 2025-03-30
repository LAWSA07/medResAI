import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Import all models to ensure tables are created
from app.db.base import Base
import app.db.base_class_registry

# Import session
from app.db.session import engine, SessionLocal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db() -> None:
    """Initialize the database by creating all tables."""
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully.")

        # Create a session
        db = SessionLocal()
        try:
            # Check connection
            db.execute(text("SELECT 1"))
            logger.info("Database connection successful.")

            # Add any initial data if needed
            # For example: create default admin user, populate lookup tables, etc.

        finally:
            db.close()

    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise


if __name__ == "__main__":
    logger.info("Creating database tables...")
    init_db()
    logger.info("Database initialization completed.")