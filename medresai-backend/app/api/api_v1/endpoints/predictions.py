from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import logging

from app.db.session import get_db
from app.api.deps import get_current_user
import app.crud.prediction as crud
from app.schemas.prediction import (
    PredictionJobCreate,
    PredictionJobResponse,
    PredictionResultResponse
)

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/jobs", response_model=PredictionJobResponse)
def create_prediction_job(
    job: PredictionJobCreate,
    db: Session = Depends(get_db),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Create a new prediction job"""
    user_id = current_user.get("id")
    logger.info(f"Creating prediction job for user {user_id}")

    try:
        # Create the job
        db_job = crud.create_prediction_job(
            db=db,
            user_id=user_id,
            input_type=job.input_type,
            input_data=job.input_data
        )

        # Start simulating job progress for development purposes
        # In production, this would be replaced by actual processing logic
        crud.simulate_job_progress(db, db_job.id)

        return db_job
    except Exception as e:
        logger.error(f"Error creating prediction job: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create prediction job"
        )


@router.get("/jobs", response_model=List[PredictionJobResponse])
def get_user_jobs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get all prediction jobs for the current user"""
    user_id = current_user.get("id")
    try:
        jobs = crud.get_user_prediction_jobs(db, user_id, skip, limit)
        return jobs
    except Exception as e:
        logger.error(f"Error retrieving prediction jobs: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not retrieve prediction jobs"
        )


@router.get("/jobs/{job_id}", response_model=PredictionJobResponse)
def get_job_status(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get the status of a specific prediction job"""
    user_id = current_user.get("id")
    job = crud.get_prediction_job(db, job_id)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    if job.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this job"
        )

    return job


@router.get("/jobs/{job_id}/results", response_model=List[PredictionResultResponse])
def get_job_results(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Get the results of a specific prediction job"""
    user_id = current_user.get("id")
    job = crud.get_prediction_job(db, job_id)

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    if job.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this job"
        )

    results = crud.get_prediction_results(db, job_id)
    return results