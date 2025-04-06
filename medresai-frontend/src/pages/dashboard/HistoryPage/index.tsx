import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Checkbox,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CompareArrows as CompareIcon } from '@mui/icons-material';
import PredictionHistoryService, { PredictionJob, PredictionResult } from '../../../services/predictionHistoryService';

const HistoryPage = () => {
  const [jobs, setJobs] = useState<PredictionJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State for job comparison
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [compareResults, setCompareResults] = useState<Map<string, PredictionResult[]>>(new Map());
  const [compareLoading, setCompareLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const userJobs = await PredictionHistoryService.getUserJobs();
      setJobs(userJobs);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to load prediction history');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get chip color based on job status
  const getStatusChipColor = (status: string) => {
    if (status === 'COMPLETED') return 'success';
    if (status.includes('FAILED')) return 'error';
    if (status === 'PENDING') return 'default';
    return 'primary'; // processing states
  };

  // Format date string for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Helper to truncate input data for display
  const truncateInputData = (data: string, maxLength = 50) => {
    return data.length > maxLength
      ? `${data.substring(0, maxLength)}...`
      : data;
  };

  // Navigate to view results for a completed job
  const viewResults = (jobId: string) => {
    navigate(`/dashboard/prediction/${jobId}`);
  };

  // Toggle job selection for comparison
  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(id => id !== jobId);
      } else {
        if (prev.length < 3) { // Limit to comparing 3 jobs at a time
          return [...prev, jobId];
        }
        return prev;
      }
    });
  };

  // Open comparison dialog and fetch results
  const openComparisonDialog = async () => {
    if (selectedJobs.length < 2) return;

    setCompareDialogOpen(true);
    setCompareLoading(true);

    try {
      const resultsMap = new Map<string, PredictionResult[]>();

      for (const jobId of selectedJobs) {
        const job = jobs.find(j => j.id === jobId);
        if (job && job.status === 'COMPLETED') {
          const results = await PredictionHistoryService.getJobResults(jobId);
          resultsMap.set(jobId, results);
        }
      }

      setCompareResults(resultsMap);
    } catch (error: any) {
      console.error("Error fetching comparison results:", error);
    } finally {
      setCompareLoading(false);
    }
  };

  // Close comparison dialog
  const closeComparisonDialog = () => {
    setCompareDialogOpen(false);
  };

  // Get job name for display in comparison
  const getJobName = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return 'Unknown Job';

    const date = new Date(job.created_at);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${job.input_type} (${formattedDate})`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Prediction History
        </Typography>

        {selectedJobs.length >= 2 && (
          <Button
            variant="contained"
            startIcon={<CompareIcon />}
            onClick={openComparisonDialog}
          >
            Compare ({selectedJobs.length})
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
        {jobs.length === 0 ? (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              You haven't made any predictions yet.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/predict')}
            >
              Create Your First Prediction
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Tooltip title="Select to compare">
                      <span>Compare</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Input Type</TableCell>
                  <TableCell>Input Data</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell padding="checkbox">
                      {job.status === 'COMPLETED' && (
                        <Checkbox
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => toggleJobSelection(job.id)}
                          disabled={selectedJobs.length >= 3 && !selectedJobs.includes(job.id)}
                        />
                      )}
                    </TableCell>
                    <TableCell>{formatDate(job.created_at)}</TableCell>
                    <TableCell>{job.input_type}</TableCell>
                    <TableCell>{truncateInputData(job.input_data)}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status.replace(/_/g, ' ')}
                        color={getStatusChipColor(job.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{job.progress_percentage}%</TableCell>
                    <TableCell>
                      {job.status === 'COMPLETED' && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => viewResults(job.id)}
                        >
                          View Results
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Comparison Dialog */}
      <Dialog
        open={compareDialogOpen}
        onClose={closeComparisonDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Compare Prediction Results</DialogTitle>
        <DialogContent dividers>
          {compareLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    {selectedJobs.map(jobId => (
                      <TableCell key={jobId} align="center">
                        {getJobName(jobId)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 3 }, (_, i) => i + 1).map(rank => (
                    <TableRow key={rank}>
                      <TableCell sx={{ fontWeight: 'bold' }}>#{rank}</TableCell>
                      {selectedJobs.map(jobId => {
                        const results = compareResults.get(jobId) || [];
                        const result = results.find(r => r.rank === rank);

                        return (
                          <TableCell key={`${jobId}-${rank}`} align="center" sx={{ minWidth: 220 }}>
                            {result ? (
                              <Box>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                                  {result.candidate_sequence}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                  <Tooltip title="Binding Score">
                                    <span>BS: {result.binding_score.toFixed(2)}</span>
                                  </Tooltip>
                                  <Tooltip title="Toxicity Score">
                                    <span>TS: {result.toxicity_score?.toFixed(2) || 'N/A'}</span>
                                  </Tooltip>
                                  <Tooltip title="Confidence Score">
                                    <span>CS: {result.confidence_score?.toFixed(2) || 'N/A'}</span>
                                  </Tooltip>
                                </Box>
                              </Box>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                No result
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeComparisonDialog}>Close</Button>
          <Button
            variant="outlined"
            onClick={() => setSelectedJobs([])}
          >
            Clear Selection
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HistoryPage;