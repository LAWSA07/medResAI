import os
from typing import Dict, Any, Optional
import logging
from datetime import datetime
import asyncio
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, PreTrainedTokenizer
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PredictionService:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = None
        self.tokenizer = None
        self.model_path = os.getenv("MODEL_PATH", "model/deepseek_finetuned_full")
        self.predictions_cache = {}
        self.initialize_model()

    def initialize_model(self):
        """Initialize the model and tokenizer."""
        try:
            logger.info(f"Loading model from {self.model_path}")

            # First try loading from local path
            try:
                logger.info("Attempting to load tokenizer from local path...")
                self.tokenizer = AutoTokenizer.from_pretrained(
                    self.model_path,
                    trust_remote_code=True,
                    use_fast=False
                )
            except Exception as e:
                logger.warning(f"Failed to load tokenizer from local path: {str(e)}")
                logger.info("Attempting to load from base model...")
                # If local loading fails, try loading from base model
                self.tokenizer = AutoTokenizer.from_pretrained(
                    "deepseek-ai/deepseek-coder-1.3b-base",
                    trust_remote_code=True,
                    use_fast=False
                )
                logger.info("Successfully loaded tokenizer from base model")

            # Load model with error handling
            try:
                logger.info("Loading model weights...")
                self.model = AutoModelForCausalLM.from_pretrained(
                    self.model_path,
                    torch_dtype=torch.float16,
                    device_map="auto",
                    trust_remote_code=True,
                    low_cpu_mem_usage=True
                )
                logger.info("Model loaded successfully!")
            except Exception as model_error:
                logger.error(f"Error loading model: {str(model_error)}")
                raise

        except Exception as e:
            logger.error(f"Error in model initialization: {str(e)}")
            raise

    async def create_prediction_job(self, sequence: str) -> Dict[str, Any]:
        """Create a new prediction job."""
        try:
            if not self.model or not self.tokenizer:
                raise RuntimeError("Model or tokenizer not initialized")

            job_id = f"pred_{int(datetime.now().timestamp())}"
            job_data = {
                "id": job_id,
                "input_sequence": sequence,
                "status": "pending",
                "result": None,
                "error": None,
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat()
            }

            # Store in local cache
            self.predictions_cache[job_id] = job_data

            # Start processing in background
            asyncio.create_task(self.process_prediction(job_id, sequence))

            return job_data

        except Exception as e:
            logger.error(f"Error creating prediction job: {str(e)}")
            raise

    async def get_prediction_status(self, job_id: str) -> Optional[Dict[str, Any]]:
        """Get the status of a prediction job."""
        return self.predictions_cache.get(job_id)

    async def process_prediction(self, job_id: str, sequence: str):
        """Process a prediction job."""
        try:
            if not self.model or not self.tokenizer:
                raise RuntimeError("Model or tokenizer not initialized")

            # Update status to processing
            self.predictions_cache[job_id]["status"] = "processing"
            self.predictions_cache[job_id]["updated_at"] = datetime.now().isoformat()

            # Prepare the prompt
            prompt = f"""Analyze the following genome sequence and predict potential antiviral drug candidates:

            Sequence: {sequence}

            Generate detailed predictions including:
            1. Potential binding sites
            2. Drug candidate sequences
            3. Mechanism of action
            """

            # Generate prediction with error handling
            try:
                inputs = self.tokenizer(
                    prompt,
                    return_tensors="pt",
                    padding=True,
                    truncation=True,
                    max_length=512
                ).to(self.device)

                with torch.no_grad():
                    outputs = self.model.generate(
                        **inputs,
                        max_length=1024,
                        temperature=0.7,
                        num_return_sequences=1,
                        pad_token_id=self.tokenizer.eos_token_id,
                        do_sample=True,
                        top_p=0.95
                    )

                # Decode prediction
                prediction = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

                # Parse prediction into structured format
                result = {
                    "input_sequence": sequence,
                    "prediction": prediction,
                    "model_version": "DeepSeek-R1-Distill-Qwen-1.5B-finetuned",
                    "timestamp": datetime.now().isoformat()
                }

                # Update cache with results
                self.predictions_cache[job_id]["status"] = "completed"
                self.predictions_cache[job_id]["result"] = result
                self.predictions_cache[job_id]["updated_at"] = datetime.now().isoformat()

                # Save prediction to file
                self._save_prediction(job_id, result)

            except Exception as pred_error:
                logger.error(f"Error during prediction generation: {str(pred_error)}")
                raise

        except Exception as e:
            error_message = str(e)
            logger.error(f"Error processing prediction: {error_message}")
            self.predictions_cache[job_id]["status"] = "failed"
            self.predictions_cache[job_id]["error"] = error_message
            self.predictions_cache[job_id]["updated_at"] = datetime.now().isoformat()

    def _save_prediction(self, job_id: str, result: Dict[str, Any]):
        """Save prediction result to file."""
        try:
            os.makedirs("predictions", exist_ok=True)
            file_path = f"predictions/{job_id}.json"

            with open(file_path, 'w') as f:
                json.dump(result, f, indent=2)

            logger.info(f"Saved prediction to {file_path}")

        except Exception as e:
            logger.error(f"Error saving prediction: {str(e)}")

prediction_service = PredictionService()