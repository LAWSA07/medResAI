import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, LinearProgress } from '@mui/material';
import PredictionService from '../../../services/prediction.service';
const PredictPage = () => {
    const [pageState, setPageState] = useState('idle');
    const [inputType, setInputType] = useState('GENOME_TEXT');
    const [inputData, setInputData] = useState('');
    const [error, setError] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [results, setResults] = useState([]);
    const [pollingInterval, setPollingInterval] = useState(null);
    const navigate = useNavigate();
    // Clear polling interval on component unmount
    useEffect(() => {
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [pollingInterval]);
    const handleInputTypeChange = (event) => {
        setInputType(event.target.value);
    };
    const handleInputDataChange = (event) => {
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
                    }
                    else if (updatedJob.status.includes('FAILED')) {
                        clearInterval(intervalId);
                        setError('Job processing failed. Please try again.');
                        setPageState('error');
                    }
                }
                catch (error) {
                    clearInterval(intervalId);
                    setError(error.message || 'An error occurred while processing your prediction.');
                    setPageState('error');
                }
            }, 2000);
            setPollingInterval(intervalId);
        }
        catch (error) {
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
        return (_jsxs(Container, { maxWidth: "md", children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Predict Antiviral Candidate" }), _jsxs(Paper, { elevation: 2, sx: { p: 4, mt: 4 }, children: [error && (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })), _jsxs(FormControl, { fullWidth: true, sx: { mb: 3 }, children: [_jsx(InputLabel, { id: "input-type-select-label", children: "Input Type" }), _jsxs(Select, { labelId: "input-type-select-label", id: "input-type-select", value: inputType, label: "Input Type", onChange: handleInputTypeChange, children: [_jsx(MenuItem, { value: "GENOME_TEXT", children: "Genome Sequence (Text)" }), _jsx(MenuItem, { value: "VIRUS_ID", children: "Virus Identifier" })] })] }), _jsx(TextField, { fullWidth: true, multiline: true, rows: 6, label: inputType === 'GENOME_TEXT' ? 'Genome Sequence' : 'Virus Identifier', placeholder: inputType === 'GENOME_TEXT'
                                ? 'Enter the genome sequence here...'
                                : 'Enter the virus identifier (e.g., SARS-CoV-2)', value: inputData, onChange: handleInputDataChange, sx: { mb: 3 } }), _jsx(Button, { variant: "contained", size: "large", onClick: startPrediction, children: "Start Prediction" })] })] }));
    }
    // Loading state - display progress
    if (pageState === 'loading' && currentJob) {
        return (_jsxs(Container, { maxWidth: "md", children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Processing Prediction" }), _jsxs(Paper, { elevation: 2, sx: { p: 4, mt: 4 }, children: [_jsxs(Typography, { variant: "h6", gutterBottom: true, children: ["Status: ", currentJob.status.replace(/_/g, ' ')] }), _jsxs(Box, { sx: { mb: 4 }, children: [_jsx(LinearProgress, { variant: "determinate", value: currentJob.progress_percentage, sx: { height: 10, borderRadius: 5 } }), _jsxs(Typography, { variant: "body2", align: "right", sx: { mt: 1 }, children: [currentJob.progress_percentage, "%"] })] }), _jsx(Typography, { variant: "body1", paragraph: true, children: "We're analyzing your input and generating antiviral candidates. This process may take a few minutes." }), _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', my: 4 }, children: _jsx(CircularProgress, { size: 60 }) })] })] }));
    }
    // Error state - display error message
    if (pageState === 'error') {
        return (_jsxs(Container, { maxWidth: "md", children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, children: "Prediction Error" }), _jsxs(Paper, { elevation: 2, sx: { p: 4, mt: 4 }, children: [_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error || 'An error occurred while processing your prediction.' }), _jsx(Typography, { variant: "body1", paragraph: true, children: "We encountered an issue while processing your prediction request. Please try again." }), _jsx(Button, { variant: "contained", onClick: resetPrediction, children: "Try Again" })] })] }));
    }
    // Fallback for unexpected state
    return (_jsx(Container, { maxWidth: "md", children: _jsx(Box, { sx: { display: 'flex', justifyContent: 'center', my: 5 }, children: _jsx(CircularProgress, {}) }) }));
};
export default PredictPage;
