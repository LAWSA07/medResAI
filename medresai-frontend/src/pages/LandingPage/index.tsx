import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme
} from '@mui/material';
import {
  Science as ScienceIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const LandingPage = () => {
  const theme = useTheme();

  const features = [
    {
      title: 'AI-Powered Research',
      description: 'Leverage cutting-edge AI models to predict drug interactions and efficacy with high accuracy.',
      icon: <ScienceIcon fontSize="large" color="primary" />
    },
    {
      title: 'Accelerated Discovery',
      description: 'Reduce discovery time from years to months with our optimized prediction algorithms.',
      icon: <SpeedIcon fontSize="large" color="primary" />
    },
    {
      title: 'Secure & Private',
      description: 'Your research data is protected with enterprise-grade security and privacy controls.',
      icon: <SecurityIcon fontSize="large" color="primary" />
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} color="transparent">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                color: '#4CAF50',
                display: 'inline-block',
                letterSpacing: '-0.02em'
              }}
            >
              MedResAI
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                to="/login"
                color="primary"
                variant="text"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(56, 142, 60, 0.05) 100%)',
          py: { xs: 8, md: 12 },
          borderRadius: '0 0 16px 16px',
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 2,
                    color: '#4CAF50',
                    display: 'inline-block'
                  }}
                >
                  Accelerating Medical Research with AI
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, fontWeight: 500 }}
                >
                  Discover breakthrough antiviral drugs faster than ever with our AI-powered platform.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                    endIcon={<ArrowForwardIcon />}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{ py: 1.5, px: 4 }}
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop"
                alt="Medical Research"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2
            }}
          >
            Why Choose MedResAI
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 6
            }}
          >
            Our platform combines cutting-edge AI with medical expertise to revolutionize drug discovery.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      textAlign: 'center',
                      mb: 2
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: '#4CAF50',
          py: 8,
          borderRadius: '16px 16px 0 0',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              gutterBottom
              color="white"
              sx={{
                fontWeight: 700,
                mb: 2
              }}
            >
              Ready to Transform Your Research?
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{
                opacity: 0.9,
                mb: 4
              }}
            >
              Join our platform today and accelerate your antiviral drug discovery.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                bgcolor: 'white',
                color: '#4CAF50',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                }
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
