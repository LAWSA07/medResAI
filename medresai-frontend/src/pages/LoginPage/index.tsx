import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface LocationState {
  message?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (error: any) {
      setError(error.message || 'Invalid email or password. Please try again.');
      setIsSubmitting(false);
    }
  };

  // If auth is loading, show minimal UI to prevent flashing
  if (authLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default'
      }}
    >
      {/* Header with Back Button */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          color="inherit"
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Back to Home
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              textDecoration: 'none',
              color: '#4CAF50',
              fontWeight: 600
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#4CAF50',
              mb: 1
            }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Log in to your MedResAI account to continue your research
          </Typography>
        </Box>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: 'error.main'
                  }
                }}
                variant="outlined"
              >
                {error}
              </Alert>
            )}

            {successMessage && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: 'success.main'
                  }
                }}
                variant="outlined"
              >
                {successMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    borderRadius: 2,
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)'
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                sx={{ mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 2,
                    '&.Mui-focused': {
                      boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)'
                    }
                  }
                }}
              />

              <Link
                to="/forgot-password"
                style={{
                  textDecoration: 'none',
                  color: '#4CAF50',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              >
                <Box sx={{ textAlign: 'right', mb: 3 }}>
                  Forgot password?
                </Box>
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600
                }}
                endIcon={isSubmitting ? null : <LoginIcon />}
              >
                {isSubmitting ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} color="inherit" />
                    <span>Logging in...</span>
                  </Stack>
                ) : 'Log In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;