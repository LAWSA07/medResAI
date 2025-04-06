import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Chip, CircularProgress, Alert, Checkbox, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { CompareArrows as CompareIcon } from '@mui/icons-material';
import PredictionService from '../../../services/prediction.service';
const HistoryPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // State for job comparison
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [compareDialogOpen, setCompareDialogOpen] = useState(false);
    const [compareResults, setCompareResults] = useState(new Map());
    const [compareLoading, setCompareLoading] = useState(false);
    useEffect(() => {
        fetchJobs();
    }, []);
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const userJobs = await PredictionService.getUserJobs();
            setJobs(userJobs);
            setError(null);
        }
        catch (error) {
            setError(error.message || 'Failed to load prediction history');
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
    // Helper to truncate input data for display
    const truncateInputData = (data, maxLength = 50) => {
        return data.length > maxLength
            ? `${data.substring(0, maxLength)}...`
            : data;
    };
    // Navigate to view results for a completed job
    const viewResults = (jobId) => {
        navigate(`/dashboard/prediction/${jobId}`);
    };
    // Toggle job selection for comparison
    const toggleJobSelection = (jobId) => {
        setSelectedJobs(prev => {
            if (prev.includes(jobId)) {
                return prev.filter(id => id !== jobId);
            }
            else {
                if (prev.length < 3) { // Limit to comparing 3 jobs at a time
                    return [...prev, jobId];
                }
                return prev;
            }
        });
    };
    // Open comparison dialog and fetch results
    const openComparisonDialog = async () => {
        if (selectedJobs.length < 2)
            return;
        setCompareDialogOpen(true);
        setCompareLoading(true);
        try {
            const resultsMap = new Map();
            for (const jobId of selectedJobs) {
                const job = jobs.find(j => j.id === jobId);
                if (job && job.status === 'COMPLETED') {
                    const results = await PredictionService.getJobResults(jobId);
                    resultsMap.set(jobId, results);
                }
            }
            setCompareResults(resultsMap);
        }
        catch (error) {
            console.error("Error fetching comparison results:", error);
        }
        finally {
            setCompareLoading(false);
        }
    };
    // Close comparison dialog
    const closeComparisonDialog = () => {
        setCompareDialogOpen(false);
    };
    // Get job name for display in comparison
    const getJobName = (jobId) => {
        const job = jobs.find(j => j.id === jobId);
        if (!job)
            return 'Unknown Job';
        const date = new Date(job.created_at);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${job.input_type} (${formattedDate})`;
    };
    if (loading) {
        return (_jsx(Container, { maxWidth: "lg", sx: { py: 4 }, children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: 8 }, children: _jsx(CircularProgress, {}) }) }));
    }
    return (_jsxs(Container, { maxWidth: "lg", sx: { py: 4 }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", children: "Prediction History" }), selectedJobs.length >= 2 && (_jsxs(Button, { variant: "contained", startIcon: _jsx(CompareIcon, {}), onClick: openComparisonDialog, children: ["Compare (", selectedJobs.length, ")"] }))] }), error && (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })), _jsx(Paper, { elevation: 2, sx: { p: 2, mt: 2 }, children: jobs.length === 0 ? (_jsxs(Box, { sx: { py: 5, textAlign: 'center' }, children: [_jsx(Typography, { variant: "body1", sx: { mb: 3 }, children: "You haven't made any predictions yet." }), _jsx(Button, { variant: "contained", onClick: () => navigate('/dashboard/predict'), children: "Create Your First Prediction" })] })) : (_jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { padding: "checkbox", children: _jsx(Tooltip, { title: "Select to compare", children: _jsx("span", { children: "Compare" }) }) }), _jsx(TableCell, { children: "Date Created" }), _jsx(TableCell, { children: "Input Type" }), _jsx(TableCell, { children: "Input Data" }), _jsx(TableCell, { children: "Status" }), _jsx(TableCell, { children: "Progress" }), _jsx(TableCell, { children: "Actions" })] }) }), _jsx(TableBody, { children: jobs.map((job) => (_jsxs(TableRow, { children: [_jsx(TableCell, { padding: "checkbox", children: job.status === 'COMPLETED' && (_jsx(Checkbox, { checked: selectedJobs.includes(job.id), onChange: () => toggleJobSelection(job.id), disabled: selectedJobs.length >= 3 && !selectedJobs.includes(job.id) })) }), _jsx(TableCell, { children: formatDate(job.created_at) }), _jsx(TableCell, { children: job.input_type }), _jsx(TableCell, { children: truncateInputData(job.input_data) }), _jsx(TableCell, { children: _jsx(Chip, { label: job.status.replace(/_/g, ' '), color: getStatusChipColor(job.status), size: "small" }) }), _jsxs(TableCell, { children: [job.progress_percentage, "%"] }), _jsx(TableCell, { children: job.status === 'COMPLETED' && (_jsx(Button, { variant: "outlined", size: "small", onClick: () => viewResults(job.id), children: "View Results" })) })] }, job.id))) })] }) })) }), _jsxs(Dialog, { open: compareDialogOpen, onClose: closeComparisonDialog, maxWidth: "lg", fullWidth: true, children: [_jsx(DialogTitle, { children: "Compare Prediction Results" }), _jsx(DialogContent, { dividers: true, children: compareLoading ? (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', p: 4 }, children: _jsx(CircularProgress, {}) })) : (_jsx(TableContainer, { children: _jsxs(Table, { size: "small", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Rank" }), selectedJobs.map(jobId => (_jsx(TableCell, { align: "center", children: getJobName(jobId) }, jobId)))] }) }), _jsx(TableBody, { children: Array.from({ length: 3 }, (_, i) => i + 1).map(rank => (_jsxs(TableRow, { children: [_jsxs(TableCell, { sx: { fontWeight: 'bold' }, children: ["#", rank] }), selectedJobs.map(jobId => {
                                                    const results = compareResults.get(jobId) || [];
                                                    const result = results.find(r => r.rank === rank);
                                                    return (_jsx(TableCell, { align: "center", sx: { minWidth: 220 }, children: result ? (_jsxs(Box, { children: [_jsx(Typography, { variant: "body2", sx: { fontFamily: 'monospace', mb: 1 }, children: result.candidate_sequence }), _jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }, children: [_jsx(Tooltip, { title: "Binding Score", children: _jsxs("span", { children: ["BS: ", result.binding_score.toFixed(2)] }) }), _jsx(Tooltip, { title: "Toxicity Score", children: _jsxs("span", { children: ["TS: ", result.toxicity_score?.toFixed(2) || 'N/A'] }) }), _jsx(Tooltip, { title: "Confidence Score", children: _jsxs("span", { children: ["CS: ", result.confidence_score?.toFixed(2) || 'N/A'] }) })] })] })) : (_jsx(Typography, { variant: "body2", color: "text.secondary", children: "No result" })) }, `${jobId}-${rank}`));
                                                })] }, rank))) })] }) })) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: closeComparisonDialog, children: "Close" }), _jsx(Button, { variant: "outlined", onClick: () => setSelectedJobs([]), children: "Clear Selection" })] })] })] }));
};
export default HistoryPage;
