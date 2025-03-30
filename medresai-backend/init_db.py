import logging
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.db.init_db import init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    db = SessionLocal()
    try:
        # Create tables
        logger.info("Creating tables...")
        Base.metadata.create_all(bind=engine)

        # Initialize data
        logger.info("Initializing data...")
        init_db(db)

        logger.info("Database initialized successfully")
    finally:
        db.close()


def main() -> None:
    logger.info("Creating database tables and initializing data")
    init()
    logger.info("Done")


if __name__ == "__main__":
    main()