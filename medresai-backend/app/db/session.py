from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Import the Base class
from app.db.base import Base

# Load environment variables
load_dotenv()

# Get SQLAlchemy database URL from environment variable or use default
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./medresai.db")

# Create engine
# For SQLite, connect_args is needed only for SQLite
connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)

# Create SessionLocal class for creating database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Import base_class_registry to register all models
# This should be imported after Base and engine are defined
import app.db.base_class_registry  # noqa

# Function to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()