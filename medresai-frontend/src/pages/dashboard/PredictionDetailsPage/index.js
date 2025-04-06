import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button, Chip, CircularProgress, Alert, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, LinearProgress, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating } from '@mui/material';
import { ArrowBack as ArrowBackIcon, FileDownload as FileDownloadIcon, Share as ShareIcon, Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import PredictionService from '../../../services/prediction.service';
// Update the GridItem component with proper typing
const GridItem = ({ children, ...props }) => (_jsx(Grid, { component: "div", item: true, ...props, children: children }));
const PredictionDetailsPage = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(null);
    const navigate = useNavigate();
    // Share dialog state
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [shareMessage, setShareMessage] = useState('');
    const [shareSending, setShareSending] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [shareError, setShareError] = useState(null);
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
    const fetchJobDetails = async (jobId) => {
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
                    }
                    catch (error) {
                        console.error('Error polling for updates:', error);
                        clearInterval(intervalId);
                    }
                }, 2000);
                setPollingInterval(intervalId);
            }
        }
        catch (error) {
            setError(error.message || 'Failed to load prediction details');
        }
        finally {
            setLoading(false);
        }
    };
    // Helper function to get chip color based on job status
    const getStatusChipColor = (status) => {
        if (status === 'COMPLETED')
            return 'success';
        if (status.includes('FAILED'))
            return 'error';
        if (status === 'PENDING')
            return 'default';
        return 'primary'; // processing states
    };
    // Format date string for display
    const formatDate = (dateString) => {
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
    const getScoreColor = (score) => {
        if (score === null)
            return 'text.secondary';
        if (score >= 0.8)
            return 'success.main';
        if (score >= 0.5)
            return 'warning.main';
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
        if (!jobDetails)
            return;
        try {
            setShareSending(true);
            setShareError(null);
            // In a real app, you would call an API to send an email
            // For now, we'll just simulate a successful email send after a delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShareSuccess(true);
            setShareSending(false);
        }
        catch (error) {
            setShareError(error.message || 'Failed to share results. Please try again.');
            setShareSending(false);
        }
    };
    // Function to render a rating based on confidence score
    const renderConfidenceRating = (score) => {
        if (score === null)
            return 'N/A';
        const rating = Math.round(score * 5); // Convert 0-1 score to 0-5 rating
        return (_jsx(Tooltip, { title: `Confidence: ${(score * 100).toFixed(1)}%`, children: _jsx(Box, { children: _jsx(Rating, { value: rating, readOnly: true, precision: 0.5, icon: _jsx(StarIcon, { fontSize: "inherit" }), emptyIcon: _jsx(StarBorderIcon, { fontSize: "inherit" }), size: "small" }) }) }));
    };
    if (loading) {
        return (_jsx(Container, { maxWidth: "lg", sx: { py: 4 }, children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: 8 }, children: _jsx(CircularProgress, {}) }) }));
    }
    if (error) {
        return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Button, { startIcon: _jsx(ArrowBackIcon, {}), onClick: () => navigate('/dashboard/history'), sx: { mb: 3 }, children: "Back to History" }), _jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })] }));
    }
    if (!jobDetails) {
        return (_jsx(Container, { maxWidth: "lg", sx: { py: 4 }, children: _jsx(Alert, { severity: "warning", children: "No prediction found with the specified ID." }) }));
    }
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsx(Button, { startIcon: _jsx(ArrowBackIcon, {}), onClick: () => navigate('/dashboard/history'), sx: { mb: 3 }, children: "Back to History" }), _jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Prediction Details" }), _jsxs(Grid, { container: true, spacing: 3, component: "div", children: [_jsx(GridItem, { xs: 12, md: 4, children: _jsx(Card, { elevation: 2, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Job Information" }), _jsx(Divider, { sx: { mb: 2 } }), _jsxs(Box, { sx: { mb: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Status" }), _jsx(Chip, { label: jobDetails.status.replace(/_/g, ' '), color: getStatusChipColor(jobDetails.status), size: "small", sx: { mt: 0.5 } })] }), _jsxs(Box, { sx: { mb: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Input Type" }), _jsx(Typography, { variant: "body1", children: jobDetails.input_type })] }), _jsxs(Box, { sx: { mb: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", children: "Created At" }), _jsx(Typography, { variant: "body1", children: formatDate(jobDetails.created_at) })] }), jobDetails.status !== 'COMPLETED' && !jobDetails.status.includes('FAILED') && (_jsxs(Box, { sx: { mt: 3 }, children: [_jsxs(Typography, { variant: "body2", sx: { mb: 1 }, children: ["Progress: ", jobDetails.progress_percentage, "%"] }), _jsx(LinearProgress, { variant: "determinate", value: jobDetails.progress_percentage, sx: { height: 8, borderRadius: 4 } })] }))] }) }) }), _jsx(GridItem, { xs: 12, md: 8, children: _jsx(Card, { elevation: 2, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Input Data" }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(Box, { sx: {
                                            p: 2,
                                            backgroundColor: 'background.default',
                                            borderRadius: 1,
                                            maxHeight: 200,
                                            overflow: 'auto',
                                            fontFamily: 'monospace'
                                        }, children: _jsx(Typography, { variant: "body2", sx: { whiteSpace: 'pre-wrap' }, children: jobDetails.input_data }) })] }) }) }), _jsx(GridItem, { xs: 12, children: _jsx(Card, { elevation: 2, children: _jsxs(CardContent, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }, children: [_jsx(Typography, { variant: "h6", children: "Prediction Results" }), jobDetails.status === 'COMPLETED' && jobDetails.results && jobDetails.results.length > 0 && (_jsxs(Box, { children: [_jsx(Tooltip, { title: "Share results via email", children: _jsx(Button, { variant: "outlined", size: "small", startIcon: _jsx(ShareIcon, {}), onClick: openShareDialog, sx: { mr: 1 }, children: "Share" }) }), _jsx(Tooltip, { title: "Download results as CSV", children: _jsx(Button, { variant: "outlined", size: "small", startIcon: _jsx(FileDownloadIcon, {}), onClick: downloadResultsAsCSV, children: "Download" }) })] }))] }), _jsx(Divider, { sx: { mb: 2 } }), !jobDetails.results || jobDetails.results.length === 0 ? (jobDetails.status === 'COMPLETED' ? (_jsx(Alert, { severity: "info", children: "No results found for this prediction." })) : (_jsx(Alert, { severity: "info", children: "Results will appear here once the prediction is complete." }))) : (_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Rank" }), _jsx(TableCell, { children: "Candidate Sequence" }), _jsx(TableCell, { align: "right", children: "Binding Score" }), _jsx(TableCell, { align: "right", children: "Toxicity Score" }), _jsx(TableCell, { align: "center", children: "Confidence" })] }) }), _jsx(TableBody, { children: jobDetails.results.map((result) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: result.rank }), _jsx(TableCell, { sx: { fontFamily: 'monospace' }, children: result.candidate_sequence }), _jsx(TableCell, { align: "right", children: _jsx(Typography, { sx: { color: getScoreColor(result.binding_score) }, children: result.binding_score.toFixed(2) }) }), _jsx(TableCell, { align: "right", children: result.toxicity_score ? (_jsx(Typography, { sx: { color: getScoreColor(1 - result.toxicity_score) }, children: result.toxicity_score.toFixed(2) })) : 'N/A' }), _jsx(TableCell, { align: "center", children: renderConfidenceRating(result.confidence_score) })] }, result.id))) })] }) }))] }) }) })] }), _jsxs(Dialog, { open: shareDialogOpen, onClose: closeShareDialog, maxWidth: "sm", fullWidth: true, children: [_jsx(DialogTitle, { children: "Share Prediction Results" }), _jsx(DialogContent, { children: shareSuccess ? (_jsxs(Alert, { severity: "success", sx: { mb: 2 }, children: ["Results successfully shared with ", recipientEmail, "!"] })) : (_jsxs(_Fragment, { children: [shareError && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: shareError })), _jsx(TextField, { fullWidth: true, label: "Recipient Email", value: recipientEmail, onChange: (e) => setRecipientEmail(e.target.value), margin: "normal", type: "email", required: true, disabled: shareSending }), _jsx(TextField, { fullWidth: true, label: "Message", value: shareMessage, onChange: (e) => setShareMessage(e.target.value), margin: "normal", multiline: true, rows: 3, disabled: shareSending })] })) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: closeShareDialog, children: shareSuccess ? 'Close' : 'Cancel' }), !shareSuccess && (_jsx(Button, { onClick: shareResults, variant: "contained", disabled: shareSending, children: shareSending ? (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { size: 20, sx: { mr: 1 } }), "Sending..."] })) : 'Share' }))] })] })] }));
};
export default PredictionDetailsPage;
