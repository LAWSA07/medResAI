import supabase from './supabase';
const PredictionService = {
    /**
     * Start a new prediction job
     */
    startPrediction: async (inputType, inputData) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            throw new Error('User not authenticated');
        }
        const { data, error } = await supabase
            .from('prediction_jobs')
            .insert({
            user_id: user.id,
            input_type: inputType,
            input_data: inputData,
            status: 'PENDING'
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    },
    /**
     * Get prediction job status
     */
    getJobStatus: async (jobId) => {
        const { data, error } = await supabase
            .from('prediction_jobs')
            .select()
            .eq('id', jobId)
            .single();
        if (error) {
            throw error;
        }
        return data;
    },
    /**
     * Get prediction results for a job
     */
    getJobResults: async (jobId) => {
        const { data, error } = await supabase
            .from('prediction_results')
            .select()
            .eq('job_id', jobId)
            .order('rank', { ascending: true });
        if (error) {
            throw error;
        }
        return data;
    },
    /**
     * Get all user's prediction jobs
     */
    getUserJobs: async () => {
        const { data, error } = await supabase
            .from('prediction_jobs')
            .select()
            .order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        return data;
    },
    /**
     * Mock function to simulate job state transitions
     * (This is a placeholder until the backend is implemented)
     */
    simulateJobProgress: async (jobId) => {
        const states = [
            'PENDING',
            'PROCESSING_GENOME',
            'ANALYZING_TARGETS',
            'GENERATING_CANDIDATES',
            'EVALUATING_CANDIDATES',
            'RANKING_RESULTS',
            'COMPLETED'
        ];
        const job = await PredictionService.getJobStatus(jobId);
        const currentIndex = states.indexOf(job.status);
        if (currentIndex < states.length - 1) {
            const nextState = states[currentIndex + 1];
            const progress = Math.min(Math.round(((currentIndex + 1) / (states.length - 1)) * 100), 100);
            const completedAt = nextState === 'COMPLETED' ? new Date().toISOString() : null;
            const { error } = await supabase
                .from('prediction_jobs')
                .update({
                status: nextState,
                progress_percentage: progress,
                completed_at: completedAt,
                updated_at: new Date().toISOString()
            })
                .eq('id', jobId);
            if (error) {
                throw error;
            }
            // If job is completed, generate mock results
            if (nextState === 'COMPLETED') {
                await PredictionService.generateMockResults(jobId);
            }
        }
    },
    /**
     * Generate mock prediction results
     * (This is a placeholder until the backend is implemented)
     */
    generateMockResults: async (jobId) => {
        const mockResults = [
            {
                job_id: jobId,
                rank: 1,
                candidate_sequence: 'ATCGGAACTTGATCGGA',
                binding_score: 0.94,
                toxicity_score: 0.12,
                confidence_score: 0.89
            },
            {
                job_id: jobId,
                rank: 2,
                candidate_sequence: 'GCTATCGACTTGATCTA',
                binding_score: 0.87,
                toxicity_score: 0.18,
                confidence_score: 0.82
            },
            {
                job_id: jobId,
                rank: 3,
                candidate_sequence: 'ATAGGCTTCGAGGCTAA',
                binding_score: 0.79,
                toxicity_score: 0.09,
                confidence_score: 0.76
            }
        ];
        const { error } = await supabase
            .from('prediction_results')
            .insert(mockResults);
        if (error) {
            throw error;
        }
    },
    async getJobDetails(jobId) {
        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user)
            throw new Error('Authentication required');
        // Get the job
        const { data: job, error: jobError } = await supabase
            .from('prediction_jobs')
            .select('*')
            .eq('id', jobId)
            .eq('user_id', user.id)
            .single();
        if (jobError)
            throw new Error(`Failed to fetch job: ${jobError.message}`);
        if (!job)
            throw new Error('Job not found');
        // Get the results
        const { data: results, error: resultsError } = await supabase
            .from('prediction_results')
            .select('*')
            .eq('job_id', jobId)
            .order('rank', { ascending: true });
        if (resultsError)
            throw new Error(`Failed to fetch results: ${resultsError.message}`);
        // Return combined data
        return {
            ...job,
            results: results || []
        };
    }
};
export default PredictionService;
