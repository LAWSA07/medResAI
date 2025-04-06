import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Alert,
  Divider,
  Chip,
  Tooltip,
  LinearProgress
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PredictionService, { ModelStatus } from '../../../services/predictionService';

// Prediction component
export default function PredictPage() {
  const [sequence, setSequence] = useState('');
  const [selectedVirus, setSelectedVirus] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [maxOutputLength, setMaxOutputLength] = useState(200);

  // Get example data
  const exampleData = PredictionService.getExampleViralData();

  // Load model status on component mount
  useEffect(() => {
    checkModelStatus();

    // Check status every 30 seconds
    const intervalId = setInterval(checkModelStatus, 30000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to check model status
  const checkModelStatus = async () => {
    try {
      setCheckingStatus(true);
      const status = await PredictionService.checkModelStatus();
      setModelStatus(status);

      // If model was in error, but now is ready, clear any errors
      if (status.status === 'ready' && error && error.includes('model')) {
        setError('');
      }
    } catch (err) {
      console.error('Failed to check model status:', err);
    } finally {
      setCheckingStatus(false);
    }
  };

  // Handle virus selection
  const handleVirusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const virus = event.target.value as string;
    setSelectedVirus(virus);

    if (virus) {
      // Load example sequence
      const data = exampleData[virus as keyof typeof exampleData];
      setSequence(data.sequence);
    } else {
      setSequence('');
    }
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!sequence) {
      setError('Please enter a genome sequence');
      return;
    }

    if (sequence.length < 10) {
      setError('Sequence is too short. Please enter at least 10 characters.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      setResult(null);

      // Call prediction service with waiting for model option
      const response = await PredictionService.predictAntiviral(sequence, {
        maxLength: maxOutputLength,
        waitForModel: true
      });

      setResult(response);

      // Refresh model status after prediction
      checkModelStatus();
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  // Render model status chip
  const renderModelStatusChip = () => {
    if (!modelStatus) {
      return (
        <Tooltip title="Checking model status...">
          <Chip
            label="Checking..."
            icon={<HourglassEmptyIcon />}
            color="default"
            size="small"
            sx={{ mb: 2 }}
          />
        </Tooltip>
      );
    }

    switch (modelStatus.status) {
      case 'ready':
        return (
          <Tooltip title="Model is loaded and ready">
            <Chip
              label="Model Ready"
              icon={<CheckCircleIcon />}
              color="success"
              size="small"
              sx={{ mb: 2 }}
            />
          </Tooltip>
        );
      case 'loading':
        return (
          <Tooltip title="Model is currently loading">
            <Chip
              label="Model Loading..."
              icon={<HourglassEmptyIcon />}
              color="warning"
              size="small"
              sx={{ mb: 2 }}
            />
          </Tooltip>
        );
      case 'error':
        return (
          <Tooltip title={modelStatus.last_error || 'Unknown error'}>
            <Chip
              label="Model Error"
              icon={<ErrorIcon />}
              color="error"
              size="small"
              sx={{ mb: 2 }}
            />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title={`Model status: ${modelStatus.status}`}>
            <Chip
              label={`Model: ${modelStatus.status}`}
              icon={<HourglassEmptyIcon />}
              color="default"
              size="small"
              sx={{ mb: 2 }}
            />
          </Tooltip>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Antiviral Drug Candidate Prediction
      </Typography>

      {/* Model Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {renderModelStatusChip()}
        {checkingStatus && (
          <CircularProgress size={16} sx={{ ml: 1 }} />
        )}
        <Button
          variant="text"
          size="small"
          onClick={checkModelStatus}
          disabled={checkingStatus}
          sx={{ ml: 1 }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Genome Sequence
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Select Example Virus (Optional)
              </Typography>
              <Select
                value={selectedVirus}
                onChange={handleVirusChange}
                displayEmpty
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Select a virus</MenuItem>
                <MenuItem value="sarsCoV2">SARS-CoV-2</MenuItem>
                <MenuItem value="hbv">Hepatitis B Virus</MenuItem>
                <MenuItem value="influenzaA">Influenza A Virus</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Genome Sequence
              </Typography>
              <TextField
                multiline
                rows={6}
                variant="outlined"
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="Enter genome sequence..."
                sx={{ mb: 2, fontFamily: 'monospace' }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Maximum Output Length
              </Typography>
              <TextField
                type="number"
                value={maxOutputLength}
                onChange={(e) => setMaxOutputLength(Number(e.target.value))}
                inputProps={{ min: 50, max: 1000 }}
                sx={{ mb: 2 }}
              />
            </FormControl>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Model not ready warning */}
            {modelStatus && modelStatus.status !== 'ready' && !error && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                The model is not ready yet ({modelStatus.status}). The prediction might take longer or fail.
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ScienceIcon />}
              onClick={handleSubmit}
              disabled={loading || !sequence}
              sx={{ mb: 2 }}
            >
              {loading ? 'Processing...' : 'Generate Prediction'}
            </Button>

            {loading && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Processing your request. This may take a minute...
                </Typography>
                <LinearProgress />
              </Box>
            )}
          </Card>
        </Grid>

        {result && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Prediction Results
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Input Sequence (truncated):
              </Typography>
              <Box sx={{ mb: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.8rem', overflow: 'auto' }}>
                {result.input_sequence.substring(0, 100)}...
              </Box>

              <Typography variant="subtitle1" fontWeight="bold">
                Prediction:
              </Typography>
              <Box sx={{ mb: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1, whiteSpace: 'pre-wrap' }}>
                {result.prediction}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Model: {result.model_version}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Generated at: {new Date(result.timestamp).toLocaleString()}
                </Typography>
                {result.prediction_time_seconds && (
                  <Typography variant="subtitle2" color="text.secondary">
                    Processing time: {result.prediction_time_seconds} seconds
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}