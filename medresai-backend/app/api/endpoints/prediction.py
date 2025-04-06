from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime
from app.services.prediction_service import prediction_service

router = APIRouter()

class SequenceRequest(BaseModel):
    sequence: str

class PredictionJobResponse(BaseModel):
    id: str
    input_sequence: str
    status: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

@router.post("/predict/antiviral", response_model=PredictionJobResponse)
async def predict_antiviral(request: SequenceRequest) -> Dict[str, Any]:
    """
    Create a prediction job and process it using the local model.
    """
    try:
        job = await prediction_service.create_prediction_job(request.sequence)
        return job

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error creating prediction job: {str(e)}"
        )

@router.get("/predict/antiviral/{job_id}", response_model=PredictionJobResponse)
async def get_prediction_status(job_id: str) -> Dict[str, Any]:
    """
    Get the status of a prediction job.
    """
    try:
        job = await prediction_service.get_prediction_status(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Prediction job not found")
        return job

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting prediction status: {str(e)}"
        )