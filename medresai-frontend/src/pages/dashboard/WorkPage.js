import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Chip, Link, Button } from '@mui/material';
import { Science as ScienceIcon, Speed as SpeedIcon, Biotech as BiotechIcon, Storage as StorageIcon, Psychology as PsychologyIcon, Cloud as CloudIcon } from '@mui/icons-material';
const WorkPage = () => {
    const technologies = [
        {
            name: "Machine Learning Models",
            description: "We utilize advanced machine learning algorithms to predict drug-target interactions, allowing us to screen billions of compounds virtually.",
            icon: _jsx(PsychologyIcon, { fontSize: "large", color: "primary" })
        },
        {
            name: "Neural Networks",
            description: "Our deep neural networks analyze molecular structures to identify compounds with high potential efficacy against viral targets.",
            icon: _jsx(CloudIcon, { fontSize: "large", color: "primary" })
        },
        {
            name: "High-Throughput Screening",
            description: "We combine AI predictions with rapid laboratory testing to validate promising antiviral candidates efficiently.",
            icon: _jsx(SpeedIcon, { fontSize: "large", color: "primary" })
        },
        {
            name: "Genomic Analysis",
            description: "Advanced genomic tools help us understand viral mechanisms and identify new therapeutic targets.",
            icon: _jsx(BiotechIcon, { fontSize: "large", color: "primary" })
        }
    ];
    const researchAreas = [
        {
            title: "Antiviral Drug Discovery",
            description: "Our primary focus is on discovering novel antiviral compounds that target emerging viral threats. We use AI to screen billions of potential molecules and identify those with the highest probability of success.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "AI-Powered Molecular Design",
            description: "Using generative AI models like SyntheMol, we design new compounds that are both effective and easily synthesizable. This approach has allowed us to explore a chemical space of nearly 30 billion molecules.",
            image: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
        },
        {
            title: "Structural Biology Integration",
            description: "We combine AI predictions with structural biology insights to understand how molecules interact with viral proteins, leading to more precise drug design.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
    ];
    const publications = [
        {
            title: "Generative AI for designing and validating easily synthesizable antiviral compounds",
            authors: "Johnson A, Smith B, et al.",
            journal: "Nature Machine Intelligence",
            year: 2023,
            url: "#"
        },
        {
            title: "Deep learning approaches to antibiotic discovery against resistant pathogens",
            authors: "Williams C, Brown D, et al.",
            journal: "Cell Reports Medicine",
            year: 2022,
            url: "#"
        },
        {
            title: "Neural networks for rapid screening of antiviral compounds against emerging viral threats",
            authors: "Garcia E, Rodriguez F, et al.",
            journal: "Frontiers in Drug Discovery",
            year: 2022,
            url: "#"
        }
    ];
    return (_jsxs(Box, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h4", component: "h1", fontWeight: 700, gutterBottom: true, children: "Our Research" }), _jsx(Typography, { variant: "body1", color: "text.secondary", paragraph: true, sx: { mb: 4 }, children: "MedResAI is at the forefront of combining artificial intelligence with medicinal chemistry to accelerate the discovery of novel antiviral drugs. Our innovative approach allows us to explore vast chemical spaces and identify promising drug candidates more efficiently than traditional methods." }), _jsxs(Paper, { elevation: 0, sx: {
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 6,
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative'
                }, children: [_jsx(Box, { component: "img", src: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", alt: "AI Drug Discovery Research", sx: {
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover'
                        } }), _jsxs(Box, { sx: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            p: 3
                        }, children: [_jsx(Typography, { variant: "h5", fontWeight: 600, children: "Accelerating Medical Breakthroughs with AI" }), _jsx(Typography, { variant: "body1", children: "Our AI platforms analyze billions of potential compounds to identify those with the highest potential for antiviral efficacy" })] })] }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Research Focus Areas" }), _jsx(Grid, { container: true, spacing: 4, sx: { mb: 6 }, children: researchAreas.map((area, index) => (_jsx(Grid, { item: true, xs: 12, md: 4, children: _jsxs(Card, { elevation: 0, sx: {
                            height: '100%',
                            borderRadius: 4,
                            overflow: 'hidden',
                            transition: 'transform 0.3s',
                            border: '1px solid rgba(0,0,0,0.05)',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }
                        }, children: [_jsx(CardMedia, { component: "img", height: "180", image: area.image, alt: area.title }), _jsxs(CardContent, { sx: { p: 3 }, children: [_jsx(Typography, { variant: "h6", component: "h3", gutterBottom: true, fontWeight: 600, children: area.title }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: area.description })] })] }) }, index))) }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Our Approach to Antiviral Discovery" }), _jsx(Paper, { elevation: 0, sx: {
                    p: 4,
                    borderRadius: 4,
                    mb: 6,
                    border: '1px solid rgba(0,0,0,0.05)',
                    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(56, 142, 60, 0.05) 100%)'
                }, children: _jsxs(Grid, { container: true, spacing: 4, alignItems: "center", children: [_jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, gutterBottom: true, children: "Combining AI with Medicinal Chemistry" }), _jsx(Typography, { variant: "body1", paragraph: true, children: "At MedResAI, we've developed proprietary algorithms that combine the power of artificial intelligence with deep expertise in medicinal chemistry. Our approach enables us to:" }), _jsxs(List, { children: [_jsxs(ListItem, { children: [_jsx(ListItemIcon, { children: _jsx(ScienceIcon, { color: "primary" }) }), _jsx(ListItemText, { primary: "Screen billions of compounds virtually", secondary: "Our AI models evaluate molecular structures to predict antiviral activity" })] }), _jsxs(ListItem, { children: [_jsx(ListItemIcon, { children: _jsx(SpeedIcon, { color: "primary" }) }), _jsx(ListItemText, { primary: "Accelerate lead discovery", secondary: "What traditionally takes years can be accomplished in months" })] }), _jsxs(ListItem, { children: [_jsx(ListItemIcon, { children: _jsx(StorageIcon, { color: "primary" }) }), _jsx(ListItemText, { primary: "Analyze structure-activity relationships", secondary: "Our algorithms identify patterns that human researchers might miss" })] }), _jsxs(ListItem, { children: [_jsx(ListItemIcon, { children: _jsx(BiotechIcon, { color: "primary" }) }), _jsx(ListItemText, { primary: "Design novel molecules", secondary: "Generative AI creates new molecular structures optimized for synthesis and efficacy" })] })] })] }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Box, { component: "img", src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", alt: "Research approach", sx: {
                                    width: '100%',
                                    borderRadius: 4,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                } }) })] }) }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Our Technologies" }), _jsx(Grid, { container: true, spacing: 3, sx: { mb: 6 }, children: technologies.map((tech, index) => (_jsx(Grid, { item: true, xs: 12, sm: 6, children: _jsxs(Paper, { elevation: 0, sx: {
                            p: 3,
                            borderRadius: 4,
                            height: '100%',
                            border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'flex-start'
                        }, children: [_jsx(Box, { sx: { mr: 2 }, children: tech.icon }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, gutterBottom: true, children: tech.name }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: tech.description })] })] }) }, index))) }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Recent Breakthroughs" }), _jsx(Paper, { elevation: 0, sx: {
                    p: 4,
                    borderRadius: 4,
                    mb: 6,
                    border: '1px solid rgba(0,0,0,0.05)'
                }, children: _jsxs(Grid, { container: true, spacing: 4, children: [_jsxs(Grid, { item: true, xs: 12, md: 6, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, gutterBottom: true, children: "SyntheMol: AI-Generated Antiviral Compounds" }), _jsx(Typography, { variant: "body2", paragraph: true, children: "Our team recently published groundbreaking research on SyntheMol, a generative AI model that designs new antiviral compounds that are both effective and easily synthesizable. This model explores a chemical space of nearly 30 billion molecules to identify promising candidates." }), _jsx(Typography, { variant: "body2", paragraph: true, children: "Key achievements include:" }), _jsxs(List, { dense: true, children: [_jsx(ListItem, { children: _jsx(ListItemText, { primary: "Identified six structurally novel molecules with antibacterial activity" }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Developed compounds effective against multiple pathogens" }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Reduced discovery time from years to months" }) }), _jsx(ListItem, { children: _jsx(ListItemText, { primary: "Created a model that ensures synthesizability of generated compounds" }) })] }), _jsx(Button, { variant: "outlined", color: "primary", size: "small", sx: { mt: 2 }, component: Link, href: "https://www.nature.com/articles/s42256-024-00809-7", target: "_blank", children: "Read the research" })] }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Box, { component: "img", src: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80", alt: "AI molecule generation", sx: {
                                    width: '100%',
                                    borderRadius: 4,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                } }) })] }) }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Recent Publications" }), _jsx(Paper, { elevation: 0, sx: {
                    p: 4,
                    borderRadius: 4,
                    mb: 6,
                    border: '1px solid rgba(0,0,0,0.05)'
                }, children: _jsx(List, { children: publications.map((pub, index) => (_jsxs(React.Fragment, { children: [_jsx(ListItem, { alignItems: "flex-start", sx: { py: 2 }, children: _jsx(ListItemText, { primary: _jsx(Link, { href: pub.url, color: "primary", underline: "hover", target: "_blank", rel: "noopener", children: _jsx(Typography, { variant: "h6", fontWeight: 600, children: pub.title }) }), secondary: _jsxs(React.Fragment, { children: [_jsx(Typography, { variant: "body2", color: "text.primary", sx: { mb: 1 }, children: pub.authors }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [pub.journal, ", ", pub.year] }), _jsxs(Box, { sx: { mt: 1 }, children: [_jsx(Chip, { label: "Antiviral Research", size: "small", sx: {
                                                            mr: 1,
                                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                                            color: '#4CAF50'
                                                        } }), _jsx(Chip, { label: "AI", size: "small", sx: {
                                                            mr: 1,
                                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                                            color: '#4CAF50'
                                                        } }), _jsx(Chip, { label: "Drug Discovery", size: "small", sx: {
                                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                                            color: '#4CAF50'
                                                        } })] })] }) }) }), index < publications.length - 1 && _jsx(Divider, { component: "li" })] }, index))) }) }), _jsx(Typography, { variant: "h5", fontWeight: 700, gutterBottom: true, sx: { mb: 3 }, children: "Collaborative Partners" }), _jsxs(Grid, { container: true, spacing: 2, sx: { mb: 6 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 0, sx: {
                                p: 3,
                                borderRadius: 4,
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, children: "Stanford University" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Joint research on machine learning models for drug discovery" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 0, sx: {
                                p: 3,
                                borderRadius: 4,
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, children: "NIH" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Funding support for advanced antiviral research initiatives" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 0, sx: {
                                p: 3,
                                borderRadius: 4,
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, children: "University of Buea" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Center for Drug Discovery focused on natural product-based antivirals" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 0, sx: {
                                p: 3,
                                borderRadius: 4,
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }, children: [_jsx(Typography, { variant: "h6", fontWeight: 600, children: "McMaster University" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Collaboration on experimental validation of AI-discovered compounds" })] }) })] })] }));
};
export default WorkPage;
