import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { ButtonWithGlow } from '../components/ui/button-with-glow';
import { AnimatedGradientBg } from '../components/ui/animated-gradient-bg';
import { TextGenerateEffect } from '../components/ui/text-generate-effect';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: "Research", href: "#research" },
  { name: "Platform", href: "#platform" },
  { name: "About", href: "#about" },
];

const SimpleIndexPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions - adding small buffer to ensure full coverage
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth + 10; // Add buffer
        canvas.height = window.innerHeight + 10; // Add buffer
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

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 800 + 400;
        this.angle = Math.random() * Math.PI * 2;
        this.width = Math.random() * 5 + 1;
        this.color = this.getRandomColor();
        this.speed = (Math.random() - 0.5) * 0.01;
      }

      getRandomColor() {
        const colors = [
          'rgba(76, 175, 80, 0.8)',  // Bright green
          'rgba(129, 199, 132, 0.7)', // Light green
          'rgba(33, 150, 243, 0.6)',  // Blue
          'rgba(156, 39, 176, 0.5)',  // Purple
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
        gradient.addColorStop(0, this.color);
        const rgbMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgbMatch) {
          const [, r, g, b] = rgbMatch;
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        } else {
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    // Create rays - increase count for more density
    const rayCount = Math.max(100, Math.floor(window.innerWidth / 15)); // Reduced ray count for better performance
    const rays: LightRay[] = [];
    for (let i = 0; i < rayCount; i++) {
      rays.push(new LightRay());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with black background
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rays
      rays.forEach(ray => {
        ray.update();
        ray.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  // Helper function to determine the correct path for virus prediction
  const getVirusPredictionPath = () => {
    if (isLoading) return "#"; // While checking auth status
    return isAuthenticated ? "/dashboard/virus" : "/virus-prediction";
  };

  // Helper function to determine the correct path for login/dashboard
  const getLoginPath = () => {
    if (isLoading) return "#"; // While checking auth status
    return isAuthenticated ? "/dashboard" : "/login";
  };

  // Helper text for login/dashboard button
  const getLoginText = () => {
    if (isLoading) return "Loading...";
    return isAuthenticated ? "Dashboard" : "Login";
  };

  return (
    <AnimatedGradientBg
      colors={[
        'rgba(76, 175, 80, 0.4)',
        'rgba(33, 150, 243, 0.3)',
        'rgba(156, 39, 176, 0.2)',
        'rgba(0, 150, 136, 0.3)',
      ]}
      size="large"
      containerClassName="min-h-screen"
    >
      <Box
        sx={{
          position: 'relative', // Change from fixed to relative
          width: '100%',
          minHeight: '100vh', // Use minHeight instead of height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
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
        <Box
          component="nav"
          sx={{
            position: "sticky", // Changed from absolute to sticky
            top: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "1.5rem",
            zIndex: 50,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              gap: "2rem",
              background: "rgba(0,0,0,0.7)", // Increased opacity for better visibility
              backdropFilter: "blur(10px)",
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                  fontWeight: 500,
                  position: "relative", // Added for better click handling
                  zIndex: 100, // Ensure clickable
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{
                rotate: isHovering ? [0, -1, 1, -1, 0] : 0,
                scale: isHovering ? 1.03 : 1,
              }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              style={{
                display: "inline-block",
                marginBottom: "1.5rem"
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(4rem, 10vw, 10rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  marginBottom: "0.5rem",
                  background: "linear-gradient(45deg, #4CAF50 20%, #81C784 50%, #4CAF50 80%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 80px rgba(76, 175, 80, 0.8)",
                  transform: "perspective(1000px) rotateX(10deg) scale(1.1)",
                  transformStyle: "preserve-3d",
                  animation: "gradient 5s ease infinite",
                }}
              >
                MedResAI
              </h1>
            </motion.div>
          </motion.div>

          <Box sx={{ marginTop: "1.5rem", marginBottom: "4rem" }}>
            <TextGenerateEffect
              words="ADVANCED MEDICAL RESEARCH PLATFORM"
              className="text-white text-xl md:text-2xl font-light tracking-wider"
            />
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <SpotlightCard
              className="w-full max-w-lg mx-auto mb-6"
              spotlightColor="#4CAF50"
            >
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: "1.5rem" }}>
                  Revolutionizing drug discovery with AI-powered predictions
                </p>

                {/* Dynamic link based on auth status */}
                <Link to={isAuthenticated ? "/dashboard" : "/landing"} style={{ textDecoration: "none" }}>
                  <ButtonWithGlow
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      padding: "0.75rem 2rem",
                      cursor: "pointer", // Ensure cursor shows as pointer
                    }}
                  >
                    {isAuthenticated ? "GO TO DASHBOARD" : "ENTER PLATFORM"}
                  </ButtonWithGlow>
                </Link>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
              <Link
                to={getVirusPredictionPath()}
                style={{
                  color: "white",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 100
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Virus Prediction
                </motion.div>
              </Link>

              <Link
                to={getLoginPath()}
                style={{
                  color: "white",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 100
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {getLoginText()}
                </motion.div>
              </Link>
            </Box>
          </motion.div>
        </Container>

        {/* Animated circles in the background */}
        <div style={{ position: "absolute", bottom: "5%", left: "10%", zIndex: 0 }}>
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(76, 175, 80, 0.15)",
              filter: "blur(40px)"
            }}
          />
        </div>

        <div style={{ position: "absolute", top: "15%", right: "15%", zIndex: 0 }}>
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(33, 150, 243, 0.15)",
              filter: "blur(40px)"
            }}
          />
        </div>
      </Box>
    </AnimatedGradientBg>
  );
};

export default SimpleIndexPage;