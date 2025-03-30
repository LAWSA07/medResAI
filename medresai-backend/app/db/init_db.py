import logging
from sqlalchemy.orm import Session

from app.models.prediction import PredictionJob, PredictionResult

# Import additional models here

logger = logging.getLogger(__name__)


def init_db(db: Session) -> None:
    """
    Initialize the database with default data.

    This function will be called during application startup or when running init_db.py
    to populate the database with any required default data.
    """
    # Check if we already have data
    prediction_job_count = db.query(PredictionJob).count()

    # Only initialize if the database is empty
    if prediction_job_count == 0:
        logger.info("No existing prediction data found. Creating sample data...")

        # Create a sample prediction job for testing
        sample_job = PredictionJob(
            user_id="sample-user",
            input_type="sample",
            input_data={"text": "This is a sample prediction input"},
            status="completed",
            progress=100.0
        )
        db.add(sample_job)
        db.flush()  # Flush to get the ID

        # Create a sample prediction result
        sample_result = PredictionResult(
            job_id=sample_job.id,
            rank=1,
            result_data={"prediction": "Sample prediction result", "details": "This is a sample result"},
            confidence=0.95
        )
        db.add(sample_result)

        db.commit()
        logger.info(f"Created sample prediction job with ID: {sample_job.id}")
    else:
        logger.info(f"Database already contains {prediction_job_count} prediction jobs. Skipping initialization.")