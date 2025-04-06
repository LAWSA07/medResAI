import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Alert, CircularProgress, Card, CardContent, Stack } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack as ArrowBackIcon, Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, authLoading, navigate]);
    // Check for success message passed from signup page
    useEffect(() => {
        if (state?.message) {
            setSuccessMessage(state.message);
            // Clear the state to prevent showing the message on refresh
            window.history.replaceState({}, document.title);
        }
    }, [state]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        // Handle login
        setIsSubmitting(true);
        try {
            await login(formData.email, formData.password);
            // If login is successful, navigation will happen through the useEffect
        }
        catch (error) {
            setError(error.message || 'Invalid email or password. Please try again.');
            setIsSubmitting(false);
        }
    };
    // If auth is loading, show minimal UI to prevent flashing
    if (authLoading) {
        return (_jsx(Box, { sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default'
            }, children: _jsx(CircularProgress, { color: "primary" }) }));
    }
    return (_jsxs(Box, { sx: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default'
        }, children: [_jsxs(Box, { sx: {
                    p: 2,
                    display: 'flex',
                    alignItems: 'center'
                }, children: [_jsx(Button, { component: Link, to: "/", startIcon: _jsx(ArrowBackIcon, {}), color: "inherit", sx: { textTransform: 'none', fontWeight: 500 }, children: "Back to Home" }), _jsx(Box, { sx: { flexGrow: 1 } }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", style: {
                                    textDecoration: 'none',
                                    color: '#4CAF50',
                                    fontWeight: 600
                                }, children: "Sign Up" })] })] }), _jsxs(Container, { maxWidth: "sm", sx: {
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    py: 4
                }, children: [_jsxs(Box, { sx: { mb: 4, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h4", component: "h1", gutterBottom: true, sx: {
                                    fontWeight: 700,
                                    color: '#4CAF50',
                                    mb: 1
                                }, children: "Welcome Back!" }), _jsx(Typography, { variant: "body1", color: "text.secondary", children: "Log in to your MedResAI account to continue your research" })] }), _jsx(Card, { elevation: 0, sx: {
                            borderRadius: 4,
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                            overflow: 'visible'
                        }, children: _jsxs(CardContent, { sx: { p: 4 }, children: [error && (_jsx(Alert, { severity: "error", sx: {
                                        mb: 3,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            color: 'error.main'
                                        }
                                    }, variant: "outlined", children: error })), successMessage && (_jsx(Alert, { severity: "success", sx: {
                                        mb: 3,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            color: 'success.main'
                                        }
                                    }, variant: "outlined", children: successMessage })), _jsxs(Box, { component: "form", onSubmit: handleSubmit, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, value: formData.email, onChange: handleChange, disabled: isSubmitting, variant: "outlined", sx: { mb: 2 }, InputProps: {
                                                sx: {
                                                    borderRadius: 2,
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)'
                                                    }
                                                }
                                            } }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: showPassword ? 'text' : 'password', id: "password", autoComplete: "current-password", value: formData.password, onChange: handleChange, disabled: isSubmitting, sx: { mb: 1 }, InputProps: {
                                                endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleTogglePasswordVisibility, edge: "end", disabled: isSubmitting, children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                                sx: {
                                                    borderRadius: 2,
                                                    '&.Mui-focused': {
                                                        boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)'
                                                    }
                                                }
                                            } }), _jsx(Link, { to: "/forgot-password", style: {
                                                textDecoration: 'none',
                                                color: '#4CAF50',
                                                fontWeight: 500,
                                                fontSize: '0.875rem'
                                            }, children: _jsx(Box, { sx: { textAlign: 'right', mb: 3 }, children: "Forgot password?" }) }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", disabled: isSubmitting, size: "large", sx: {
                                                py: 1.5,
                                                borderRadius: 2,
                                                fontWeight: 600
                                            }, endIcon: isSubmitting ? null : _jsx(LoginIcon, {}), children: isSubmitting ? (_jsxs(Stack, { direction: "row", spacing: 1, alignItems: "center", children: [_jsx(CircularProgress, { size: 20, color: "inherit" }), _jsx("span", { children: "Logging in..." })] })) : 'Log In' })] })] }) })] })] }));
};
export default LoginPage;
