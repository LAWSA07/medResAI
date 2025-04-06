"""
Prediction API endpoints.
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from datetime import datetime
import logging

from app.ml.model_loader import model_service

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter()

class SequenceRequest(BaseModel):
    """Request model for sequence prediction."""
    sequence: str = Field(..., min_length=10, description="Genome sequence to analyze")
    max_length: int = Field(200, ge=50, le=1000, description="Maximum output length")

class VirusQueryRequest(BaseModel):
    """Request model for virus prediction."""
    query: str = Field(..., min_length=10, description="Detailed information about the virus")

class VirusQueryResponse(BaseModel):
    """Response model for virus prediction."""
    predictedSequences: list[str]
    explanation: str
    disclaimer: str

class PredictionResponse(BaseModel):
    """Response model for sequence prediction."""
    input_sequence: str
    prediction: str
    model_version: str
    timestamp: datetime
    prediction_time_seconds: float = None

class StatusResponse(BaseModel):
    """Response model for model status."""
    status: str
    is_loading: bool
    model_loaded: bool
    tokenizer_loaded: bool
    last_error: str = None
    last_prediction_time: float = None
    version: str = "DeepSeek-R1-Distill-Qwen-1.5B-finetuned"

@router.get("/status", response_model=StatusResponse)
async def get_model_status():
    """
    Get the current status of the model.
    """
    status = model_service.status
    return {
        **status,
        "version": "DeepSeek-R1-Distill-Qwen-1.5B-finetuned"
    }

@router.post("/virus", response_model=VirusQueryResponse)
async def predict_virus(request: VirusQueryRequest):
    """
    Process a virus information query and return predicted therapeutic sequences.
    """
    logger.info(f"Received virus query: {request.query[:100]}...")

    # For testing, return a mock response
    disclaimer = (
        "These are predicted sequences based on computational analysis. "
        "These predictions are theoretical and would require extensive laboratory validation, "
        "including in vitro and in vivo testing, before any conclusions about their utility "
        "in drug development could be drawn. This information is provided solely for research "
        "purposes and should not be used for clinical applications without proper experimental validation."
    )

    # Determine virus type from query
    query_lower = request.query.lower()

    if "sars-cov-2" in query_lower or "coronavirus" in query_lower:
        return {
            "predictedSequences": [
                "5'-GCTGGATCAGGACAATACTTGTATCATATGCGCATGACTCAACTGCACCTGATGTACTTAAAGATTGTAGTAAGGTCAATGAGACCATGA-3'",
                "5'-TCTGCTGCTGTAGGTAACAGCGCTTCTTGCGCAACTAGTGGTAGTTCTGATAACAATGGTACTTCACCAGACACA-3'"
            ],
            "explanation": "The predicted sequences target the receptor-binding domain and main protease of SARS-CoV-2, with modifications designed to create binding sites for antiviral compounds.",
            "disclaimer": disclaimer
        }
    elif "hepatitis" in query_lower or "hbv" in query_lower:
        return {
            "predictedSequences": [
                "5'-ATGGAGAACATCGCATCAGGACTCCTAAGTCCTTCTGCGACACCGGTATAAAGGGATTCGCACTCCTCCTGCCTCCACCAATCGG-3'",
                "5'-CTCTGCCGATCCATACTGCGGAACTCCTAGCAGCCATCTTCGAGAACCACCGTGAGATCTTCTTCGACGACGGGGATAACCCCTACTG-3'"
            ],
            "explanation": "The predicted sequences target the surface antigen and reverse transcriptase of Hepatitis B virus, with modifications designed to enhance therapeutic antibody binding and inhibit viral replication.",
            "disclaimer": disclaimer
        }
    elif "influenza" in query_lower or "h1n1" in query_lower:
        return {
            "predictedSequences": [
                "5'-TCTAGAGGTACTTCAGCTGCAGATTACAACTTCGGTGACCCACTTGTAGGAGCTACTGACCAAGGCCCTGAGTACTACTTGAACAGG-3'",
                "5'-GAGTGTCAGCTCAACTCTGATCCAGGCAACGACTGGACCAGTACCAATGCTATACAAGAGCTGCTGACTAACCCTAGAGGCATT-3'"
            ],
            "explanation": "The predicted sequences target the hemagglutinin and neuraminidase proteins of Influenza A virus, with modifications designed to interfere with viral attachment and address common resistance mutations.",
            "disclaimer": disclaimer
        }
    else:
        return {
            "predictedSequences": [
                "5'-ATGCTAGCTAGCTAGCTATCGATCGATCGATCGATCGATGCTAGCTAGCTATCGATCGATCGATCGTAGCTATGC-3'",
                "5'-GCTATCGATCGATCGATCGATGCTAGCTAGCTAGCTATCGATCGATCGATCGATCGTAGCTATGCTAGCTAGCT-3'"
            ],
            "explanation": "The model has generated general antiviral candidate sequences based on the provided information. These sequences are designed to target common viral mechanisms.",
            "disclaimer": disclaimer
        }

@router.post("/antiviral", response_model=PredictionResponse)
async def predict_antiviral(request: SequenceRequest):
    """
    Generate antiviral predictions for a given genome sequence.
    """
    logger.info(f"Received prediction request for sequence: {request.sequence[:50]}...")

    # Validate input
    if len(request.sequence) < 10:
        raise HTTPException(status_code=400, detail="Sequence is too short")

    # Check if model is currently loading
    if model_service.status["is_loading"]:
        raise HTTPException(
            status_code=503,
            detail="Model is currently loading. Please try again in a few moments."
        )

    try:
        # Generate prediction
        result = model_service.predict(request.sequence, max_length=request.max_length)

        if "error" in result:
            logger.error(f"Prediction error: {result['error']}")
            raise HTTPException(
                status_code=500,
                detail=f"Prediction error: {result['error']}",
                headers={"X-Model-Status": result.get("status", "error")}
            )

        # Return prediction response
        return PredictionResponse(
            input_sequence=result["input_sequence"],
            prediction=result["prediction"],
            model_version=result["model_version"],
            timestamp=datetime.now(),
            prediction_time_seconds=result.get("prediction_time_seconds")
        )
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        logger.error(f"Error processing prediction request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))