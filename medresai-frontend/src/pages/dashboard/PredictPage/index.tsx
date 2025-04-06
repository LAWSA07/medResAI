import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  SelectChangeEvent,
  LinearProgress
} from '@mui/material';
import PredictionService, { PredictionJob, PredictionResult } from '../../../services/prediction.service';

type PageState = 'idle' | 'loading' | 'results' | 'error';

const PredictPage = () => {
  const [pageState, setPageState] = useState<PageState>('idle');
  const [inputType, setInputType] = useState<PredictionJob['input_type']>('GENOME_TEXT');
  const [inputData, setInputData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState<PredictionJob | null>(null);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [pollingInterval, setPollingInterval] = useState<number | null>(null);
  const navigate = useNavigate();

  // Clear polling interval on component unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleInputTypeChange = (event: SelectChangeEvent<string>) => {
    setInputType(event.target.value as PredictionJob['input_type']);
  };

  const handleInputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(event.target.value);
  };

  const startPrediction = async () => {
    setError(null);

    // Validate input
    if (!inputData.trim()) {
      setError('Please enter genome sequence data');
      return;
    }

    try {
      setPageState('loading');
      const job = await PredictionService.startPrediction(inputType, inputData);
      setCurrentJob(job);

      // For demo purposes, simulate job progress
      // In a real app, we would poll the server for status updates
      const intervalId = window.setInterval(async () => {
        try {
          await PredictionService.simulateJobProgress(job.id);
          const updatedJob = await PredictionService.getJobStatus(job.id);
          setCurrentJob(updatedJob);

          if (updatedJob.status === 'COMPLETED') {
            clearInterval(intervalId);
            navigate(`/dashboard/prediction/${job.id}`);
          } else if (updatedJob.status.includes('FAILED')) {
            clearInterval(intervalId);
            setError('Job processing failed. Please try again.');
            setPageState('error');
          }
        } catch (error: any) {
          clearInterval(intervalId);
          setError(error.message || 'An error occurred while processing your prediction.');
          setPageState('error');
        }
      }, 2000);

      setPollingInterval(intervalId);
    } catch (error: any) {
      setError(error.message || 'An error occurred while starting the prediction.');
      setPageState('error');
    }
  };

  const resetPrediction = () => {
    setPageState('idle');
    setError(null);
    setCurrentJob(null);
    setResults([]);
    setInputData('');
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  // Idle state - display input form
  if (pageState === 'idle') {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Predict Antiviral Candidate
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="input-type-select-label">Input Type</InputLabel>
            <Select
              labelId="input-type-select-label"
              id="input-type-select"
              value={inputType}
              label="Input Type"
              onChange={handleInputTypeChange}
            >
              <MenuItem value="GENOME_TEXT">Genome Sequence (Text)</MenuItem>
              <MenuItem value="VIRUS_ID">Virus Identifier</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={6}
            label={inputType === 'GENOME_TEXT' ? 'Genome Sequence' : 'Virus Identifier'}
            placeholder={inputType === 'GENOME_TEXT'
              ? 'Enter the genome sequence here...'
              : 'Enter the virus identifier (e.g., SARS-CoV-2)'}
            value={inputData}
            onChange={handleInputDataChange}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={startPrediction}
          >
            Start Prediction
          </Button>
        </Paper>
      </Container>
    );
  }

  // Loading state - display progress
  if (pageState === 'loading' && currentJob) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Processing Prediction
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Status: {currentJob.status.replace(/_/g, ' ')}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <LinearProgress
              variant="determinate"
              value={currentJob.progress_percentage}
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" align="right" sx={{ mt: 1 }}>
              {currentJob.progress_percentage}%
            </Typography>
          </Box>

          <Typography variant="body1" paragraph>
            We're analyzing your input and generating antiviral candidates. This process may take a few minutes.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress size={60} />
          </Box>
        </Paper>
      </Container>
    );
  }

  // Error state - display error message
  if (pageState === 'error') {
    return (
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Prediction Error
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mt: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'An error occurred while processing your prediction.'}
          </Alert>

          <Typography variant="body1" paragraph>
            We encountered an issue while processing your prediction request. Please try again.
          </Typography>

          <Button variant="contained" onClick={resetPrediction}>
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  // Fallback for unexpected state
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default PredictPage;