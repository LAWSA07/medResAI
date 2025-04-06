import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, PreTrainedTokenizer
from pathlib import Path
import os
from typing import Dict, Any
from datetime import datetime

class ModelService:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = None
        self.tokenizer = None
        self.initialize_model()

    def initialize_model(self):
        """Initialize the model and tokenizer."""
        try:
            # Get the path to the fine-tuned model weights
            model_path = os.getenv("FINETUNED_MODEL_PATH", "model/deepseek_finetuned_full")
            model_path = Path(model_path).absolute()

            print(f"Loading model from {model_path}...")

            # First try loading the tokenizer directly
            try:
                print("Attempting to load tokenizer...")
                self.tokenizer = AutoTokenizer.from_pretrained(
                    str(model_path),
                    trust_remote_code=True,
                    use_fast=False  # Use the slower but more compatible Python tokenizer
                )
            except Exception as e:
                print(f"Error loading tokenizer: {str(e)}")
                print("Attempting to load from base model...")
                # If that fails, try loading from the base model
                self.tokenizer = AutoTokenizer.from_pretrained(
                    "deepseek-ai/deepseek-coder-1.3b-base",
                    trust_remote_code=True,
                    use_fast=False
                )

            print("Tokenizer loaded successfully!")

            # Load the model with the fine-tuned weights
            print("Loading model weights...")
            self.model = AutoModelForCausalLM.from_pretrained(
                str(model_path),
                torch_dtype=torch.float16,
                device_map="auto",
                trust_remote_code=True,
                low_cpu_mem_usage=True
            )

            print("Model loaded successfully!")

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    async def predict_antiviral(self, sequence: str) -> Dict[str, Any]:
        """
        Generate antiviral predictions for a given genome sequence.

        Args:
            sequence (str): The input genome sequence

        Returns:
            Dict[str, Any]: Prediction results including candidate sequences and metadata
        """
        try:
            if not self.model or not self.tokenizer:
                raise RuntimeError("Model or tokenizer not initialized")

            # Prepare the prompt
            prompt = f"""Analyze the following genome sequence and predict potential antiviral drug candidates:

            Sequence: {sequence}

            Generate detailed predictions including:
            1. Potential binding sites
            2. Drug candidate sequences
            3. Mechanism of action
            """

            # Tokenize input
            inputs = self.tokenizer(prompt, return_tensors="pt", padding=True, truncation=True).to(self.device)

            # Generate prediction
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

            # Decode the generated text
            prediction = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

            # Process and format the prediction
            result = {
                "input_sequence": sequence,
                "prediction": prediction,
                "model_version": "DeepSeek-R1-Distill-Qwen-1.5B-finetuned",
                "timestamp": str(datetime.now())
            }

            return result

        except Exception as e:
            print(f"Error during prediction: {str(e)}")
            raise

# Create a singleton instance
model_service = ModelService()