import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, Paper, Grid, InputAdornment, IconButton, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
const SignupPage = () => {
    const navigate = useNavigate();
    const { signup, isAuthenticated, isLoading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(null);
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, authLoading, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };
    const calculatePasswordStrength = (password) => {
        if (password.length < 6) {
            setPasswordStrength('weak');
            return;
        }
        let score = 0;
        if (password.length >= 8)
            score += 1;
        if (/[A-Z]/.test(password))
            score += 1;
        if (/[0-9]/.test(password))
            score += 1;
        if (/[^A-Za-z0-9]/.test(password))
            score += 1;
        if (score < 2)
            setPasswordStrength('weak');
        else if (score < 4)
            setPasswordStrength('medium');
        else
            setPasswordStrength('strong');
    };
    const getPasswordHelperText = () => {
        if (!formData.password)
            return '';
        switch (passwordStrength) {
            case 'weak':
                return 'Weak: Try a longer password with numbers and special characters';
            case 'medium':
                return 'Medium: Add special characters to make it stronger';
            case 'strong':
                return 'Strong password';
            default:
                return '';
        }
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Basic validation
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }
        // Password strength validation
        if (passwordStrength === 'weak') {
            setError('Please use a stronger password');
            return;
        }
        // Handle sign up
        setIsSubmitting(true);
        try {
            await signup(formData.email, formData.password);
            // Show success message and redirect to login
            navigate('/login', {
                state: {
                    message: 'Registration successful! Please check your email to confirm your account before logging in.'
                }
            });
        }
        catch (error) {
            setError(error.message || 'An error occurred during signup. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    // If auth is loading, show minimal UI to prevent flashing
    if (authLoading) {
        return (_jsx(Container, { maxWidth: "xs", children: _jsx(Box, { sx: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }, children: _jsx(CircularProgress, {}) }) }));
    }
    return (_jsx(Container, { maxWidth: "xs", children: _jsx(Box, { sx: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }, children: _jsxs(Paper, { elevation: 3, sx: { p: 4, width: '100%' }, children: [_jsx(Typography, { variant: "h4", component: "h1", align: "center", gutterBottom: true, children: "Sign Up" }), error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), _jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 1 }, children: [_jsx(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", autoFocus: true, value: formData.email, onChange: handleChange, disabled: isSubmitting }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: showPassword ? 'text' : 'password', id: "password", autoComplete: "new-password", value: formData.password, onChange: handleChange, helperText: getPasswordHelperText(), FormHelperTextProps: {
                                    sx: {
                                        color: passwordStrength === 'weak'
                                            ? 'error.main'
                                            : passwordStrength === 'medium'
                                                ? 'warning.main'
                                                : passwordStrength === 'strong'
                                                    ? 'success.main'
                                                    : 'text.secondary'
                                    }
                                }, disabled: isSubmitting, InputProps: {
                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: handleTogglePasswordVisibility, edge: "end", disabled: isSubmitting, children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) }))
                                } }), _jsx(TextField, { margin: "normal", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm Password", type: showConfirmPassword ? 'text' : 'password', id: "confirmPassword", autoComplete: "new-password", value: formData.confirmPassword, onChange: handleChange, disabled: isSubmitting, InputProps: {
                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle confirm password visibility", onClick: handleToggleConfirmPasswordVisibility, edge: "end", disabled: isSubmitting, children: showConfirmPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) }))
                                } }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { size: 24, sx: { mr: 1 } }), "Signing up..."] })) : ('Sign Up') }), _jsx(Grid, { container: true, justifyContent: "flex-end", children: _jsx(Grid, { item: true, children: _jsx(MuiLink, { component: RouterLink, to: "/login", underline: "none", sx: { cursor: 'pointer' }, children: _jsx(Typography, { variant: "body2", color: "primary", children: "Already have an account? Login" }) }) }) })] })] }) }) }));
};
export default SignupPage;
