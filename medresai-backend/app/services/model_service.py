import os
from pathlib import Path
from typing import Dict, Any
from datetime import datetime

# Try to import ML libraries, fall back to mock if not available
try:
    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer, PreTrainedTokenizer
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    print("Warning: PyTorch/Transformers not available. Using mock implementation.")

class ModelService:
    def __init__(self):
        self.ml_available = ML_AVAILABLE
        if self.ml_available:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
            self.model = None
            self.tokenizer = None
            self.initialize_model()
        else:
            self.device = "cpu"
            self.model = None
            self.tokenizer = None
            print("Using mock model service - ML libraries not available")

    def initialize_model(self):
        """Initialize the model and tokenizer."""
        if not self.ml_available:
            print("ML libraries not available, skipping model initialization")
            return
            
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
            try:
                # Try loading with auto device mapping first
                self.model = AutoModelForCausalLM.from_pretrained(
                    str(model_path),
                    torch_dtype=torch.float16,
                    device_map="auto",
                    trust_remote_code=True,
                    low_cpu_mem_usage=True
                )
            except ValueError as e:
                if "offload the whole model to the disk" in str(e):
                    print("Model too large for auto device mapping, trying CPU-only loading...")
                    # Fall back to CPU-only loading
                    self.model = AutoModelForCausalLM.from_pretrained(
                        str(model_path),
                        torch_dtype=torch.float16,
                        device_map=None,
                        trust_remote_code=True,
                        low_cpu_mem_usage=True
                    )
                    self.device = "cpu"
                else:
                    raise e

            print("Model loaded successfully!")

        except Exception as e:
            print(f"Error loading model: {str(e)}")
            print("Falling back to mock model service...")
            # Set ml_available to False to use mock predictions
            self.ml_available = False
            self.model = None
            self.tokenizer = None
            self.device = "cpu"
            print("✅ Successfully switched to mock model service")

    async def predict_antiviral(self, sequence: str) -> Dict[str, Any]:
        """
        Generate antiviral predictions for a given genome sequence.

        Args:
            sequence (str): The input genome sequence

        Returns:
            Dict[str, Any]: Prediction results including candidate sequences and metadata
        """
        if not self.ml_available:
            # Return mock prediction if ML libraries not available
            return {
                "input_sequence": sequence,
                "prediction": f"""Based on analysis of the sequence {sequence[:20]}..., here are the predicted antiviral drug candidates:

1. **Binding Site Prediction**: 
   - Primary binding site: Position 245-267 (high affinity)
   - Secondary binding site: Position 189-203 (moderate affinity)

2. **Drug Candidate Sequences**:
   - Candidate 1: 5'-GCTGGATCAGGACAATACTTGTATCATATGCGCATGACTCAACTGCACCTGATGTACTTAAAGATTGTAGTAAGGTCAATGAGACCATGA-3'
   - Candidate 2: 5'-TCTGCTGCTGTAGGTAACAGCGCTTCTTGCGCAACTAGTGGTAGTTCTGATAACAATGGTACTTCACCAGACACA-3'

3. **Mechanism of Action**:
   - Inhibits viral replication by binding to the RNA polymerase active site
   - Prevents viral protein synthesis through competitive inhibition
   - Induces conformational changes in viral structural proteins

**Note**: This is a mock prediction. Install PyTorch and Transformers for real AI-generated predictions.""",
                "model_version": "Mock-Model (ML libraries not available)",
                "timestamp": str(datetime.now())
            }
            
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