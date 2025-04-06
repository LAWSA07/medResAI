"""
Model loader for machine learning models.
This version is a mock that doesn't load actual models to avoid dependency issues.
"""
import logging
import time

logger = logging.getLogger(__name__)

class ModelService:
    def __init__(self):
        self.status = {
            "status": "ready",
            "is_loading": False,
            "model_loaded": True,
            "tokenizer_loaded": True,
            "last_error": None,
            "last_prediction_time": 0.2,
        }
        logger.info("ModelService initialized with mock implementation")

    def load_model(self):
        """Mock loading a model"""
        logger.info("Mock loading model...")
        time.sleep(0.5)  # Simulate loading
        logger.info("Mock model loaded")
        return True

    def predict(self, sequence, max_length=200):
        """Mock prediction function"""
        logger.info(f"Mock prediction for sequence: {sequence[:20]}...")
        start_time = time.time()

        # Simulate prediction time
        time.sleep(0.5)

        end_time = time.time()
        prediction_time = end_time - start_time

        # Update status
        self.status["last_prediction_time"] = prediction_time

        # Return a mock prediction
        return {
            "input_sequence": sequence,
            "prediction": f"PREDICTED-{sequence[:10]}-ANTIVIRAL-SEQUENCE",
            "model_version": "DeepSeek-R1-Distill-Qwen-1.5B-finetuned",
            "prediction_time_seconds": prediction_time
        }

# Initialize the model service
model_service = ModelService()