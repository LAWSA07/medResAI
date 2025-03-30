from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional
from datetime import datetime


class PredictionJobBase(BaseModel):
    """Base model for prediction jobs"""
    input_type: str = Field(..., description="Type of input data (e.g., 'image', 'text', 'sequence')")
    input_data: Dict[str, Any] = Field(..., description="Input data for the prediction")


class PredictionJobCreate(PredictionJobBase):
    """Model for creating a new prediction job"""
    pass


class PredictionJobResponse(PredictionJobBase):
    """Model for prediction job response"""
    id: int
    user_id: str
    status: str
    progress: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PredictionJobUpdate(BaseModel):
    status: Optional[str] = None
    progress: Optional[float] = None


class PredictionJobInDB(PredictionJobBase):
    id: int
    user_id: str
    status: str
    progress: float
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class PredictionJob(PredictionJobInDB):
    pass


class PredictionResultBase(BaseModel):
    """Base model for prediction results"""
    rank: int = Field(..., description="Ranking of this result (1 is highest)")
    result_data: Dict[str, Any] = Field(..., description="Result data")
    confidence: float = Field(..., description="Confidence score (0-1)")


class PredictionResultCreate(PredictionResultBase):
    """Model for creating a new prediction result"""
    job_id: int = Field(..., description="ID of the associated prediction job")


class PredictionResultResponse(PredictionResultBase):
    """Model for prediction result response"""
    id: int
    job_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class PredictionResult(PredictionResultResponse):
    pass


class PredictionJobWithResults(PredictionJobResponse):
    """Model for prediction job with its results"""
    results: List[PredictionResultResponse] = []