from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional, Dict, Any
from datetime import datetime
import json
import random

from app.models.prediction import PredictionJob, PredictionResult
from app.schemas.prediction import PredictionJobCreate, PredictionJobUpdate, PredictionResultCreate


def create_prediction_job(db: Session, user_id: str, input_type: str, input_data: dict):
    """Create a new prediction job"""
    db_job = PredictionJob(
        user_id=user_id,
        input_type=input_type,
        input_data=input_data,
        status="pending",
        progress=0.0
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


def get_prediction_job(db: Session, job_id: int):
    """Get a prediction job by ID"""
    return db.query(PredictionJob).filter(PredictionJob.id == job_id).first()


def get_user_prediction_jobs(db: Session, user_id: str, skip: int = 0, limit: int = 100):
    """Get all prediction jobs for a user"""
    return db.query(PredictionJob)\
        .filter(PredictionJob.user_id == user_id)\
        .order_by(desc(PredictionJob.created_at))\
        .offset(skip)\
        .limit(limit)\
        .all()


def update_prediction_job_status(db: Session, job_id: int, status: str, progress: float = None):
    """Update the status and progress of a prediction job"""
    db_job = db.query(PredictionJob).filter(PredictionJob.id == job_id).first()
    if db_job:
        db_job.status = status
        if progress is not None:
            db_job.progress = progress
        db_job.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_job)
    return db_job


def create_prediction_result(db: Session, job_id: int, rank: int, result_data: dict, confidence: float):
    """Create a prediction result for a job"""
    db_result = PredictionResult(
        job_id=job_id,
        rank=rank,
        result_data=result_data,
        confidence=confidence
    )
    db.add(db_result)
    db.commit()
    db.refresh(db_result)
    return db_result


def get_prediction_results(db: Session, job_id: int):
    """Get all results for a prediction job"""
    return db.query(PredictionResult)\
        .filter(PredictionResult.job_id == job_id)\
        .order_by(PredictionResult.rank)\
        .all()


def delete_prediction_job(db: Session, job_id: int) -> bool:
    """Delete a prediction job and its results (cascade delete)"""
    db_job = get_prediction_job(db, job_id)
    if not db_job:
        return False

    db.delete(db_job)
    db.commit()
    return True


# Mock functions for development and testing

def simulate_job_progress(db: Session, job_id: int):
    """Simulate the progression of a job through various states"""
    import time
    import random
    import threading

    def run_simulation():
        # Set job to processing
        update_prediction_job_status(db, job_id, "processing", 0.1)
        time.sleep(2)

        # Update progress incrementally
        for progress in [0.25, 0.5, 0.75, 0.9]:
            time.sleep(random.uniform(1, 3))
            update_prediction_job_status(db, job_id, "processing", progress)

        # Complete the job
        time.sleep(random.uniform(1, 2))
        update_prediction_job_status(db, job_id, "completed", 1.0)

        # Generate mock results
        generate_mock_results(db, job_id)

    # Run the simulation in a separate thread to not block the API
    thread = threading.Thread(target=run_simulation)
    thread.daemon = True
    thread.start()

    return {"message": "Job simulation started"}


def generate_mock_results(db: Session, job_id: int):
    """Generate mock results for a job"""
    job = get_prediction_job(db, job_id)
    if not job or job.status != "completed":
        return

    result_count = random.randint(3, 7)
    for i in range(result_count):
        confidence = round(random.uniform(0.5, 0.98), 2)
        mock_data = {
            "prediction": f"Result {i+1} for job {job_id}",
            "details": {
                "method": "AI Analysis",
                "probability": confidence,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
        create_prediction_result(db, job_id, i+1, mock_data, confidence)