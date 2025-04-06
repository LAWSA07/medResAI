import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  GridProps as MuiGridProps,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Theme
} from '@mui/material';
import { SxProps } from '@mui/system';
import { ArrowBack as ArrowBackIcon, FileDownload as FileDownloadIcon, Share as ShareIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import PredictionService, { PredictionJob, PredictionResult } from '../../../services/prediction.service';

// Define proper interface for GridItem props
interface GridItemProps extends Omit<MuiGridProps, 'item'> {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

// Update the GridItem component with proper typing
const GridItem = ({ children, ...props }: GridItemProps) => (
  <Grid component="div" item {...props}>
    {children}
  </Grid>
);

interface PredictionJobDetail extends PredictionJob {
  results: PredictionResult[];
}

const PredictionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [jobDetails, setJobDetails] = useState<PredictionJobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<number | null>(null);
  const navigate = useNavigate();

  // Share dialog state
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [shareSending, setShareSending] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
    }

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [id]);

  const fetchJobDetails = async (jobId: string) => {
    try {
      setLoading(true);
      const details = await PredictionService.getJobDetails(jobId);
      setJobDetails(details);

      // If job is still processing, set up polling to check for updates
      if (details.status !== 'COMPLETED' && !details.status.includes('FAILED')) {
        const intervalId = window.setInterval(async () => {
          try {
            await PredictionService.simulateJobProgress(jobId);
            const updatedDetails = await PredictionService.getJobDetails(jobId);
            setJobDetails(updatedDetails);

            if (updatedDetails.status === 'COMPLETED' || updatedDetails.status.includes('FAILED')) {
              clearInterval(intervalId);
            }
          } catch (error: any) {
            console.error('Error polling for updates:', error);
            clearInterval(intervalId);
          }
        }, 2000);

        setPollingInterval(intervalId);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load prediction details');
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

  // Helper function to get color based on score value
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text.secondary';
    if (score >= 0.8) return 'success.main';
    if (score >= 0.5) return 'warning.main';
    return 'error.main';
  };

  // Function to download results as CSV
  const downloadResultsAsCSV = () => {
    if (!jobDetails || !jobDetails.results || jobDetails.results.length === 0) {
      return;
    }

    // Create CSV headers
    const headers = ['Rank', 'Candidate Sequence', 'Binding Score', 'Toxicity Score', 'Confidence Score'];

    // Create CSV rows
    const rows = jobDetails.results.map(result => [
      result.rank,
      result.candidate_sequence,
      result.binding_score.toFixed(2),
      result.toxicity_score ? result.toxicity_score.toFixed(2) : 'N/A',
      result.confidence_score ? result.confidence_score.toFixed(2) : 'N/A'
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `prediction-results-${jobDetails.id}.csv`);
    document.body.appendChild(link);

    // Trigger download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to open share dialog
  const openShareDialog = () => {
    if (jobDetails) {
      setShareMessage(`Check out these antiviral prediction results from MedResAI for ${jobDetails.input_type === 'GENOME_TEXT' ? 'the genome sequence' : 'virus ID'} I analyzed.`);
      setShareDialogOpen(true);
    }
  };

  // Function to close share dialog
  const closeShareDialog = () => {
    setShareDialogOpen(false);
    setShareSuccess(false);
    setShareError(null);
  };

  // Function to share results
  const shareResults = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      setShareError('Please enter a valid email address');
      return;
    }

    if (!jobDetails) return;

    try {
      setShareSending(true);
      setShareError(null);

      // In a real app, you would call an API to send an email
      // For now, we'll just simulate a successful email send after a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setShareSuccess(true);
      setShareSending(false);
    } catch (error: any) {
      setShareError(error.message || 'Failed to share results. Please try again.');
      setShareSending(false);
    }
  };

  // Function to render a rating based on confidence score
  const renderConfidenceRating = (score: number | null) => {
    if (score === null) return 'N/A';

    const rating = Math.round(score * 5); // Convert 0-1 score to 0-5 rating

    return (
      <Tooltip title={`Confidence: ${(score * 100).toFixed(1)}%`}>
        <Box>
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            size="small"
          />
        </Box>
      </Tooltip>
    );
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard/history')}
          sx={{ mb: 3 }}
        >
          Back to History
        </Button>

        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!jobDetails) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">No prediction found with the specified ID.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard/history')}
        sx={{ mb: 3 }}
      >
        Back to History
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Prediction Details
      </Typography>

      <Grid container spacing={3} component="div">
        {/* Job Details Card */}
        <GridItem xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Chip
                  label={jobDetails.status.replace(/_/g, ' ')}
                  color={getStatusChipColor(jobDetails.status) as any}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Input Type</Typography>
                <Typography variant="body1">{jobDetails.input_type}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Created At</Typography>
                <Typography variant="body1">{formatDate(jobDetails.created_at)}</Typography>
              </Box>

              {jobDetails.status !== 'COMPLETED' && !jobDetails.status.includes('FAILED') && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Progress: {jobDetails.progress_percentage}%</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={jobDetails.progress_percentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </GridItem>

        {/* Input Data Card */}
        <GridItem xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Input Data
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{
                p: 2,
                backgroundColor: 'background.default',
                borderRadius: 1,
                maxHeight: 200,
                overflow: 'auto',
                fontFamily: 'monospace'
              }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {jobDetails.input_data}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </GridItem>

        {/* Results Table */}
        <GridItem xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Prediction Results
                </Typography>

                {jobDetails.status === 'COMPLETED' && jobDetails.results && jobDetails.results.length > 0 && (
                  <Box>
                    <Tooltip title="Share results via email">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ShareIcon />}
                        onClick={openShareDialog}
                        sx={{ mr: 1 }}
                      >
                        Share
                      </Button>
                    </Tooltip>
                    <Tooltip title="Download results as CSV">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FileDownloadIcon />}
                        onClick={downloadResultsAsCSV}
                      >
                        Download
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {!jobDetails.results || jobDetails.results.length === 0 ? (
                jobDetails.status === 'COMPLETED' ? (
                  <Alert severity="info">No results found for this prediction.</Alert>
                ) : (
                  <Alert severity="info">Results will appear here once the prediction is complete.</Alert>
                )
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Candidate Sequence</TableCell>
                        <TableCell align="right">Binding Score</TableCell>
                        <TableCell align="right">Toxicity Score</TableCell>
                        <TableCell align="center">Confidence</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobDetails.results.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>{result.rank}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{result.candidate_sequence}</TableCell>
                          <TableCell align="right">
                            <Typography sx={{ color: getScoreColor(result.binding_score) }}>
                              {result.binding_score.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {result.toxicity_score ? (
                              <Typography sx={{ color: getScoreColor(1 - result.toxicity_score) }}>
                                {result.toxicity_score.toFixed(2)}
                              </Typography>
                            ) : 'N/A'}
                          </TableCell>
                          <TableCell align="center">
                            {renderConfidenceRating(result.confidence_score)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </GridItem>
      </Grid>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={closeShareDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Share Prediction Results</DialogTitle>
        <DialogContent>
          {shareSuccess ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Results successfully shared with {recipientEmail}!
            </Alert>
          ) : (
            <>
              {shareError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {shareError}
                </Alert>
              )}
              <TextField
                fullWidth
                label="Recipient Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                margin="normal"
                type="email"
                required
                disabled={shareSending}
              />
              <TextField
                fullWidth
                label="Message"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                margin="normal"
                multiline
                rows={3}
                disabled={shareSending}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShareDialog}>
            {shareSuccess ? 'Close' : 'Cancel'}
          </Button>
          {!shareSuccess && (
            <Button
              onClick={shareResults}
              variant="contained"
              disabled={shareSending}
            >
              {shareSending ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Sending...
                </>
              ) : 'Share'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PredictionDetailsPage;