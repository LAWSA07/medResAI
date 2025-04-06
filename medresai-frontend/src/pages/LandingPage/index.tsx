import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Fade,
  useMediaQuery
} from '@mui/material';
import {
  Science as ScienceIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutMenuOpen = Boolean(anchorEl);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const researchTools = [
    {
      title: 'Genome Analysis',
      description: 'Advanced tools for analyzing viral genomes and identifying potential drug targets.',
      icon: '🧬'
    },
    {
      title: 'Protein Modeling',
      description: 'Visualize complex protein structures and predict binding interactions in 3D.',
      icon: '🔬'
    },
    {
      title: 'Predictive Analytics',
      description: 'Utilize machine learning to forecast drug efficacy and potential side effects.',
      icon: '📊'
    },
    {
      title: 'Collaboration Tools',
      description: 'Share findings with your team and work together on breakthrough discoveries.',
      icon: '👥'
    }
  ];

  const testimonials = [
    {
      quote: "MedResAI has transformed our research process. We've reduced our discovery timeline by 60%.",
      author: "Dr. Sarah Chen",
      role: "Lead Researcher, BioPharm Institute"
    },
    {
      quote: "The antiviral predictions were remarkably accurate and helped us focus our lab efforts effectively.",
      author: "Prof. Michael Rodriguez",
      role: "University Medical Center"
    }
  ];

  // Handle About dropdown
  const handleAboutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAboutClose = () => {
    setAnchorEl(null);
  };

  // Mobile menu handlers
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 3D background with light rays animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Light Ray class
    class LightRay {
      x: number;
      y: number;
      length: number;
      angle: number;
      width: number;
      color: string;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 600 + 300;
        this.angle = Math.random() * Math.PI * 2;
        this.width = Math.random() * 5 + 1;
        this.color = this.getRandomColor();
        this.speed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      getRandomColor() {
        const colors = [
          'rgba(76, 175, 80, 0.8)',    // Green (primary) - higher opacity
          'rgba(129, 199, 132, 0.8)',  // Light green - higher opacity
          'rgba(0, 150, 136, 0.6)',    // Teal - higher opacity
          'rgba(33, 150, 243, 0.5)',   // Blue - higher opacity
          'rgba(156, 39, 176, 0.4)',   // Purple - higher opacity
          'rgba(255, 235, 59, 0.4)',   // Yellow - new color
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.angle += this.speed;
      }

      draw() {
        if (!ctx) return;

        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, this.color.replace(')', ', ' + this.opacity + ')'));
        gradient.addColorStop(1, this.color.replace(')', ', 0)'));

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Molecule class
    class Molecule {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      connections: Molecule[];
      rotationSpeed: number;
      angle: number;
      orbitRadius: number;
      centerX: number;
      centerY: number;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.connections = [];
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = Math.random() * 30 + 10;
        this.centerX = x;
        this.centerY = y;
      }

      update() {
        // Orbit effect for 3D-like movement
        this.angle += this.rotationSpeed;
        this.x = this.centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.centerY + Math.sin(this.angle) * this.orbitRadius;

        // Also move the center position slowly
        this.centerX += this.vx;
        this.centerY += this.vy;

        // Bounce off edges
        if (this.centerX + this.orbitRadius > canvas!.width || this.centerX - this.orbitRadius < 0) {
          this.vx *= -1;
        }
        if (this.centerY + this.orbitRadius > canvas!.height || this.centerY - this.orbitRadius < 0) {
          this.vy *= -1;
        }
      }

      draw() {
        if (!ctx) return;

        // Create gradient for more 3D effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'rgba(76, 175, 80, 0.8)');
        gradient.addColorStop(1, this.color);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          this.x, this.y, this.radius,
          this.x, this.y, this.radius * 1.5
        );
        glowGradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
        glowGradient.addColorStop(1, 'rgba(76, 175, 80, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw connections with depth perception
        this.connections.forEach(molecule => {
          const dx = this.x - molecule.x;
          const dy = this.y - molecule.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Fade connection based on distance for depth effect
          const opacity = Math.max(0.05, 1 - distance / 150);

          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(molecule.x, molecule.y);
          ctx.strokeStyle = `rgba(76, 175, 80, ${opacity})`;
          ctx.lineWidth = Math.max(0.5, 2 - distance / 100); // Thicker when closer
          ctx.stroke();
        });
      }
    }

    // Create light rays
    const rayCount = 80;
    const rays: LightRay[] = [];
    for (let i = 0; i < rayCount; i++) {
      rays.push(new LightRay());
    }

    // Create molecules
    const moleculeCount = Math.floor(window.innerWidth / 40); // More molecules
    const molecules: Molecule[] = [];
    const colors = [
      'rgba(46, 125, 50, 0.6)',
      'rgba(76, 175, 80, 0.6)',
      'rgba(129, 199, 132, 0.6)',
      'rgba(27, 94, 32, 0.6)'
    ];

    for (let i = 0; i < moleculeCount; i++) {
      const radius = Math.random() * 6 + 3; // Larger molecules
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      molecules.push(new Molecule(x, y, radius, color));
    }

    // Create connections between nearby molecules
    molecules.forEach(molecule => {
      molecules.forEach(otherMolecule => {
        if (molecule !== otherMolecule) {
          const dx = molecule.x - otherMolecule.x;
          const dy = molecule.y - otherMolecule.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) { // Longer connection distance
            molecule.connections.push(otherMolecule);
          }
        }
      });
    });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Draw dark background with more dramatic gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      bgGradient.addColorStop(0, 'rgba(0, 10, 5, 0.99)');  // Almost black with slight green tint
      bgGradient.addColorStop(1, 'rgba(0, 5, 0, 0.99)');   // Pure black with slight green tint
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw light rays
      rays.forEach(ray => {
        ray.update();
        ray.draw();
      });

      // Draw molecules
      molecules.forEach(molecule => {
        molecule.update();
        molecule.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'transparent' // Make background transparent to show canvas
    }}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      {/* Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{
          zIndex: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              MedResAI
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    id="about-button"
                    aria-controls={aboutMenuOpen ? 'about-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={aboutMenuOpen ? 'true' : undefined}
                    onClick={handleAboutClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                      }
                    }}
                  >
                    About
                  </Button>
                  <Menu
                    id="about-menu"
                    anchorEl={anchorEl}
                    open={aboutMenuOpen}
                    onClose={handleAboutClose}
                    TransitionComponent={Fade}
                    MenuListProps={{
                      'aria-labelledby': 'about-button',
                    }}
                    sx={{
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        boxShadow: '0 10px 40px 0 rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <MenuItem onClick={() => { handleAboutClose(); handleNavigation('/about/technology'); }}>
                      Technology
                    </MenuItem>
                    <MenuItem onClick={() => { handleAboutClose(); handleNavigation('/about/team'); }}>
                      Our Team
                    </MenuItem>
                    <MenuItem onClick={() => { handleAboutClose(); handleNavigation('/about/mission'); }}>
                      Our Mission
                    </MenuItem>
                  </Menu>
                </Box>

                <Button
                  component={Link}
                  to="/molecules"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                    }
                  }}
                >
                  Molecule Viewer
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(46, 125, 50, 0.04)',
                    }
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
                    background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(46, 125, 50, 0.3)',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      {isMobile && mobileMenuOpen && (
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            zIndex: 10,
            backgroundColor: 'white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 10px 40px 0 rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavigation('/about/technology');
              }}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                }
              }}
            >
              About - Technology
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavigation('/about/team');
              }}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                }
              }}
            >
              About - Our Team
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavigation('/about/mission');
              }}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                }
              }}
            >
              About - Our Mission
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/molecules"
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                }
              }}
            >
              Molecule Viewer
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/login"
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(46, 125, 50, 0.04)',
                }
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                mt: 1,
                py: 1.5,
                background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      )}

      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: 'auto', md: 'calc(100vh - 64px)' },
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: 3,
          py: { xs: 8, md: 0 }
        }}
      >
        <Box
          sx={{
            maxWidth: '1000px',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%': {
                transform: 'translateY(0px)'
              },
              '50%': {
                transform: 'translateY(-20px)'
              },
              '100%': {
                transform: 'translateY(0px)'
              }
            }
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem', lg: '7rem' },
              fontWeight: 800,
              letterSpacing: '-0.04em',
              mb: 2,
              background: 'linear-gradient(45deg, #4CAF50 20%, #81C784 50%, #4CAF50 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient 5s ease infinite',
              '@keyframes gradient': {
                '0%': {
                  backgroundPosition: '0% center'
                },
                '50%': {
                  backgroundPosition: '100% center'
                },
                '100%': {
                  backgroundPosition: '0% center'
                }
              },
              textShadow: '0 0 60px rgba(76, 175, 80, 0.9)',
              transform: 'perspective(800px) rotateX(10deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            MedResAI
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              p: 2,
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            Advanced medical research platform powered by artificial intelligence.
            <br />Predict therapeutic sequences and discover antiviral candidates.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/virus-prediction"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: '0 4px 20px rgba(76, 175, 80, 0.6)',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.6)'
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 30px rgba(76, 175, 80, 0.8)'
                  },
                  '100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.6)'
                  }
                }
              }}
            >
              Virus Prediction
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                borderWidth: 2,
                color: '#4CAF50',
                borderColor: '#4CAF50',
                background: 'rgba(0, 0, 0, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  borderColor: '#81C784',
                }
              }}
            >
              Sign Up Free
            </Button>
          </Box>

          {/* Featured In Section */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2, fontWeight: 500 }}>
              FEATURED IN
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 4, md: 6 },
                flexWrap: 'wrap',
                px: 3,
                py: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(5px)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic', fontWeight: 500 }}>
                Nature Biotech
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic', fontWeight: 500 }}>
                MedTech Journal
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic', fontWeight: 500 }}>
                BioPharma Today
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* What's New Section - Inspired by Lu.ma */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        py: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: '#81C784', fontWeight: 600, letterSpacing: 2 }}>
              WHAT'S NEW
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
                color: 'white',
              }}
            >
              Latest Research Tools
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                maxWidth: 700,
                mx: 'auto',
                mb: 6
              }}
            >
              Our platform is continually evolving with new features to accelerate medical discoveries
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {researchTools.map((tool, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(76, 175, 80, 0.3)'
                    },
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '5px',
                      background: 'linear-gradient(90deg, #1B5E20, #4CAF50)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 1, fontSize: '2.5rem', textAlign: 'center' }}>
                      {tool.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'white'
                      }}
                    >
                      {tool.title}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        mb: 2,
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {tool.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10, position: 'relative', zIndex: 1 }}>
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

      {/* Testimonials Section */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        py: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}>
              TESTIMONIALS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2
              }}
            >
              What Researchers Say
            </Typography>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    p: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        fontStyle: 'italic',
                        mb: 4,
                        position: 'relative',
                        '&:before': {
                          content: '"""',
                          position: 'absolute',
                          top: '-20px',
                          left: '-10px',
                          fontSize: '4rem',
                          color: 'rgba(76, 175, 80, 0.2)',
                          fontFamily: 'serif'
                        }
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        {testimonial.author.charAt(0)}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.author}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section - Inspired by Lu.ma */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10, position: 'relative', zIndex: 1 }}>
        <Box sx={{
          p: 6,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.05)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.08)'
        }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}>
                IMPACT METRICS
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Accelerating Medical Research
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Our platform is helping researchers around the world make breakthrough discoveries faster than ever before.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
              >
                See More Stats
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box sx={{ p: 3, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 3, height: '100%' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      87%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Reduction in drug discovery time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 3, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 3, height: '100%' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      15K+
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Researchers using our platform
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 3, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 3, height: '100%' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      94%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Prediction accuracy rate
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 3, backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: 3, height: '100%' }}>
                    <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      43
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Countries with active users
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: 'rgba(33, 150, 243, 0.2)',
          backdropFilter: 'blur(10px)',
          py: 8,
          position: 'relative',
          zIndex: 1,
          borderRadius: '16px 16px 0 0',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: 'none',
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
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
              <Button
                component={Link}
                to="/demo"
                variant="outlined"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  color: 'white',
                  borderColor: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                Request Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
