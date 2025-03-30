# Import base class
from app.db.base import Base

# Import all models so they are registered with SQLAlchemy
from app.models.prediction import PredictionJob, PredictionResult  # noqa

# Add any other models here