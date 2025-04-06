import os
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Dict, Any
from app.services.model_service import model_service
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

try:
    logger.info(f"Initializing Supabase client with URL: {supabase_url}")
    supabase: Client = create_client(supabase_url, supabase_key)
    logger.info("Supabase client initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {str(e)}")
    raise

class SupabaseService:
    async def create_prediction_job(self, sequence: str) -> Dict[str, Any]:
        """Create a new prediction job in Supabase."""
        try:
            logger.info("Creating new prediction job")
            # Create a new job record
            job_data = {
                "input_sequence": sequence,
                "status": "pending",
                "result": None,
                "error": None
            }

            response = supabase.table("prediction_jobs").insert(job_data).execute()
            logger.info(f"Created prediction job with ID: {response.data[0].get('id')}")
            return response.data[0]

        except Exception as e:
            logger.error(f"Error creating prediction job: {str(e)}")
            raise

    async def update_job_status(self, job_id: str, status: str, result: Dict[str, Any] = None, error: str = None):
        """Update the status of a prediction job."""
        try:
            logger.info(f"Updating job {job_id} status to {status}")
            update_data = {
                "status": status,
                "result": result,
                "error": error
            }

            supabase.table("prediction_jobs").update(update_data).eq("id", job_id).execute()
            logger.info(f"Successfully updated job {job_id}")

        except Exception as e:
            logger.error(f"Error updating job status: {str(e)}")
            raise

    async def process_prediction(self, job_id: str, sequence: str):
        """Process a prediction job using the local model."""
        try:
            logger.info(f"Starting prediction processing for job {job_id}")
            # Update status to processing
            await self.update_job_status(job_id, "processing")

            # Run prediction using local model
            result = await model_service.predict_antiviral(sequence)

            # Update job with results
            await self.update_job_status(job_id, "completed", result=result)
            logger.info(f"Successfully completed prediction for job {job_id}")

        except Exception as e:
            error_message = str(e)
            logger.error(f"Error processing prediction for job {job_id}: {error_message}")
            await self.update_job_status(job_id, "failed", error=error_message)
            raise

    async def get_job_status(self, job_id: str) -> Dict[str, Any]:
        """Get the status of a prediction job."""
        try:
            logger.info(f"Fetching status for job {job_id}")
            response = supabase.table("prediction_jobs").select("*").eq("id", job_id).execute()
            if not response.data:
                logger.warning(f"Job not found: {job_id}")
                raise ValueError(f"Job not found: {job_id}")
            logger.info(f"Successfully retrieved status for job {job_id}")
            return response.data[0]

        except Exception as e:
            logger.error(f"Error getting job status: {str(e)}")
            raise

supabase_service = SupabaseService()