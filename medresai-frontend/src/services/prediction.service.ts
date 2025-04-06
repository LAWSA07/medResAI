import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export interface PredictionJob {
  id: string;
  input_sequence: string;
  status: string;
  result?: any;
  error?: string;
  created_at: string;
  updated_at?: string;
}

class PredictionService {
  async submitPrediction(sequence: string): Promise<PredictionJob> {
    try {
      const response = await axios.post(`${API_URL}/predict/antiviral`, {
        sequence: sequence
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting prediction:', error);
      throw error;
    }
  }

  async getPredictionStatus(jobId: string): Promise<PredictionJob> {
    try {
      const response = await axios.get(`${API_URL}/predict/antiviral/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting prediction status:', error);
      throw error;
    }
  }

  async pollPredictionStatus(jobId: string, onUpdate: (job: PredictionJob) => void): Promise<void> {
    const poll = async () => {
      try {
        const job = await this.getPredictionStatus(jobId);
        onUpdate(job);

        if (job.status === 'pending' || job.status === 'processing') {
          // Continue polling after 2 seconds
          setTimeout(poll, 2000);
        }
      } catch (error) {
        console.error('Error polling prediction status:', error);
        throw error;
      }
    };

    // Start polling
    await poll();
  }
}

export const predictionService = new PredictionService();