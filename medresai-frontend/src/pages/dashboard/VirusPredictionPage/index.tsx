import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import { VirusDataService, VirusQueryResponse } from '../../../services/virusDataService';

/**
 * Virus Prediction Page - Allows users to enter information about viruses and get
 * predicted therapeutic sequences using Disy-inspired design.
 */
const VirusPredictionPage = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VirusQueryResponse | null>(null);

  // Get example data from the virus data service
  const exampleData = VirusDataService.getExampleVirusData();

  // Load an example query
  const loadExample = (index: number) => {
    if (exampleData.query.length > index) {
      setQuery(exampleData.query[index]);
    }
  };

  // Submit the query to the API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim().length < 10) {
      setError('Please provide a detailed description of the virus (at least 10 characters)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await VirusDataService.queryVirusData(query);
      setResult(response);
    } catch (err: any) {
      console.error('Error querying virus data:', err);
      setError(err.message || 'Failed to get virus predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section with gradient text */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1B5E20 30%, #43A047 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Virus Sequence Prediction
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '750px',
            mx: 'auto',
            color: 'text.secondary',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          Provide detailed information about a virus, including its structure, genome, infection mechanism,
          and any known sequences. Our AI will analyze the data and predict potential therapeutic target sequences.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Query Form */}
        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              boxShadow: '0 10px 40px 0 rgba(0,0,0,0.06)',
              overflow: 'hidden',
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 50px 0 rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🧬</span>
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  Virus Details
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.06)' }} />

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={12}
                  label="Virus Description"
                  placeholder="Enter detailed information about the virus (genome size, protein structure, infection mechanism, sequences, etc.)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.01)'
                    }
                  }}
                  disabled={loading}
                />

                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || query.trim().length < 10}
                    sx={{
                      px: 4,
                      py: 1.5,
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
                      minWidth: '180px'
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1.5 }} color="inherit" />
                        Processing...
                      </>
                    ) : 'Predict Sequences'}
                  </Button>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => loadExample(0)}
                      disabled={loading}
                      sx={{ borderRadius: 2 }}
                    >
                      SARS-CoV-2
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => loadExample(1)}
                      disabled={loading}
                      sx={{ borderRadius: 2 }}
                    >
                      HBV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => loadExample(2)}
                      disabled={loading}
                      sx={{ borderRadius: 2 }}
                    >
                      Influenza
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Display */}
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              boxShadow: '0 10px 40px 0 rgba(0,0,0,0.06)',
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 50px 0 rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>🔬</span>
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  Prediction Results
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: 'rgba(0, 0, 0, 0.06)' }} />

              {result ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} mr={2}>
                      Predicted Therapeutic Sequences:
                    </Typography>
                    <Chip
                      label={`${result.predictedSequences.length} found`}
                      size="small"
                      color="primary"
                      sx={{
                        height: '24px',
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>

                  {result.predictedSequences.map((sequence, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        my: 2,
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        overflowX: 'auto',
                        borderRadius: 2,
                        border: '1px solid rgba(46, 125, 50, 0.1)'
                      }}
                    >
                      {sequence}
                    </Paper>
                  ))}

                  <Box sx={{ mt: 4, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Explanation:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mb: 3
                      }}
                    >
                      {result.explanation}
                    </Typography>
                  </Box>

                  <Alert
                    severity="info"
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'rgba(2, 136, 209, 0.04)',
                    }}
                  >
                    <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
                      {result.disclaimer}
                    </Typography>
                  </Alert>
                </Box>
              ) : (
                <Box
                  sx={{
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.01)',
                    borderRadius: 2
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                      borderRadius: '50%',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <span style={{ fontSize: '1.75rem' }}>🧪</span>
                  </Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ maxWidth: '280px' }}
                  >
                    Enter virus details and click "Predict Sequences" to see results here.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VirusPredictionPage;