import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography, Stack, Grid, Card, CardContent, AppBar, Toolbar, useTheme } from '@mui/material';
import { Science as ScienceIcon, Speed as SpeedIcon, Security as SecurityIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
const LandingPage = () => {
    const theme = useTheme();
    const features = [
        {
            title: 'AI-Powered Research',
            description: 'Leverage cutting-edge AI models to predict drug interactions and efficacy with high accuracy.',
            icon: _jsx(ScienceIcon, { fontSize: "large", color: "primary" })
        },
        {
            title: 'Accelerated Discovery',
            description: 'Reduce discovery time from years to months with our optimized prediction algorithms.',
            icon: _jsx(SpeedIcon, { fontSize: "large", color: "primary" })
        },
        {
            title: 'Secure & Private',
            description: 'Your research data is protected with enterprise-grade security and privacy controls.',
            icon: _jsx(SecurityIcon, { fontSize: "large", color: "primary" })
        }
    ];
    return (_jsxs(Box, { sx: { overflow: 'hidden' }, children: [_jsx(AppBar, { position: "static", elevation: 0, color: "transparent", children: _jsx(Container, { maxWidth: "lg", children: _jsxs(Toolbar, { disableGutters: true, children: [_jsx(Typography, { variant: "h5", component: "div", sx: {
                                    flexGrow: 1,
                                    fontWeight: 700,
                                    color: '#4CAF50',
                                    display: 'inline-block',
                                    letterSpacing: '-0.02em'
                                }, children: "MedResAI" }), _jsxs(Stack, { direction: "row", spacing: 2, children: [_jsx(Button, { component: Link, to: "/login", color: "primary", variant: "text", children: "Login" }), _jsx(Button, { component: Link, to: "/signup", variant: "contained", color: "primary", children: "Sign Up" })] })] }) }) }), _jsx(Box, { sx: {
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(56, 142, 60, 0.05) 100%)',
                    py: { xs: 8, md: 12 },
                    borderRadius: '0 0 16px 16px',
                    mb: 8,
                }, children: _jsx(Container, { maxWidth: "lg", children: _jsxs(Grid, { container: true, spacing: 4, alignItems: "center", children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Box, { sx: { p: { xs: 2, md: 4 } }, children: [_jsx(Typography, { variant: "h2", component: "h1", gutterBottom: true, sx: {
                                                fontWeight: 800,
                                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                                lineHeight: 1.2,
                                                mb: 2,
                                                color: '#4CAF50',
                                                display: 'inline-block'
                                            }, children: "Accelerating Medical Research with AI" }), _jsx(Typography, { variant: "h5", color: "text.secondary", sx: { mb: 4, fontWeight: 500 }, children: "Discover breakthrough antiviral drugs faster than ever with our AI-powered platform." }), _jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, children: [_jsx(Button, { component: Link, to: "/signup", variant: "contained", size: "large", color: "primary", sx: {
                                                        py: 1.5,
                                                        px: 4,
                                                        fontSize: '1rem',
                                                        fontWeight: 600
                                                    }, endIcon: _jsx(ArrowForwardIcon, {}), children: "Get Started" }), _jsx(Button, { component: Link, to: "/login", variant: "outlined", size: "large", sx: { py: 1.5, px: 4 }, children: "Login" })] })] }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Box, { component: "img", src: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop", alt: "Medical Research", sx: {
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: 500,
                                        objectFit: 'cover',
                                        borderRadius: 4,
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    } }) })] }) }) }), _jsxs(Container, { maxWidth: "lg", sx: { mb: 10 }, children: [_jsxs(Box, { sx: { textAlign: 'center', mb: 6 }, children: [_jsx(Typography, { variant: "h3", gutterBottom: true, sx: {
                                    fontWeight: 700,
                                    mb: 2
                                }, children: "Why Choose MedResAI" }), _jsx(Typography, { variant: "h6", color: "text.secondary", sx: {
                                    maxWidth: 700,
                                    mx: 'auto',
                                    mb: 6
                                }, children: "Our platform combines cutting-edge AI with medical expertise to revolutionize drug discovery." })] }), _jsx(Grid, { container: true, spacing: 4, children: features.map((feature, index) => (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Card, { elevation: 0, sx: {
                                    height: '100%',
                                    borderRadius: 4,
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                                    }
                                }, children: _jsxs(CardContent, { sx: { p: 4 }, children: [_jsx(Box, { sx: { mb: 2, display: 'flex', justifyContent: 'center' }, children: _jsx(Box, { sx: {
                                                    p: 2,
                                                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }, children: feature.icon }) }), _jsx(Typography, { variant: "h5", component: "h3", gutterBottom: true, sx: {
                                                textAlign: 'center',
                                                fontWeight: 600,
                                            }, children: feature.title }), _jsx(Typography, { color: "text.secondary", sx: {
                                                textAlign: 'center',
                                                mb: 2
                                            }, children: feature.description })] }) }) }, index))) })] }), _jsx(Box, { sx: {
                    bgcolor: '#4CAF50',
                    py: 8,
                    borderRadius: '16px 16px 0 0',
                }, children: _jsx(Container, { maxWidth: "md", children: _jsxs(Box, { sx: { textAlign: 'center' }, children: [_jsx(Typography, { variant: "h3", gutterBottom: true, color: "white", sx: {
                                    fontWeight: 700,
                                    mb: 2
                                }, children: "Ready to Transform Your Research?" }), _jsx(Typography, { variant: "h6", color: "white", sx: {
                                    opacity: 0.9,
                                    mb: 4
                                }, children: "Join our platform today and accelerate your antiviral drug discovery." }), _jsx(Button, { component: Link, to: "/signup", variant: "contained", size: "large", sx: {
                                    py: 1.5,
                                    px: 4,
                                    bgcolor: 'white',
                                    color: '#4CAF50',
                                    fontWeight: 600,
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.9)',
                                    }
                                }, children: "Get Started Now" })] }) }) })] }));
};
export default LandingPage;
