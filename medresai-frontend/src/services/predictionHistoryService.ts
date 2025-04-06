import axios from 'axios';

// API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

/**
 * Types for the prediction history API
 */
export interface PredictionJob {
  id: string;
  user_id: string;
  input_type: string;
  input_data: string;
  status: string;
  progress_percentage: number;
  error_message?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface PredictionResult {
  id: string;
  job_id: string;
  rank: number;
  candidate_sequence: string;
  binding_score: number;
  toxicity_score?: number;
  confidence_score?: number;
  created_at: string;
}

/**
 * Service for handling prediction history
 */
export default class PredictionHistoryService {
  /**
   * Get all user's prediction jobs
   */
  static async getUserJobs(): Promise<PredictionJob[]> {
    try {
      // In real implementation, this would call your backend API
      // For now, return empty array since we're not using the history yet
      return [];
    } catch (error) {
      console.error('Error fetching user jobs:', error);
      throw error;
    }
  }

  /**
   * Get prediction job details
   */
  static async getJobDetails(jobId: string): Promise<{ results: PredictionResult[] } & PredictionJob> {
    try {
      // In real implementation, this would call your backend API
      // For now, return mock data
      const mockJob: PredictionJob = {
        id: jobId,
        user_id: 'user123',
        input_type: 'GENOME_TEXT',
        input_data: 'ATGC...',
        status: 'COMPLETED',
        progress_percentage: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      };

      const mockResults: PredictionResult[] = [];

      return {
        ...mockJob,
        results: mockResults
      };
    } catch (error) {
      console.error('Error fetching job details:', error);
      throw error;
    }
  }

  /**
   * Get prediction results for a job
   */
  static async getJobResults(jobId: string): Promise<PredictionResult[]> {
    try {
      // In real implementation, this would call your backend API
      return [];
    } catch (error) {
      console.error('Error fetching job results:', error);
      throw error;
    }
  }

  /**
   * Mock function to simulate job state transitions
   * Since we don't need this functionality with our backend API implementation
   */
  static async simulateJobProgress(jobId: string): Promise<void> {
    console.log('Simulating job progress is not needed with backend API');
  }
}