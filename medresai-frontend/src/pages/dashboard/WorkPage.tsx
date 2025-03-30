import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
  Link,
  Button
} from '@mui/material';
import {
  Science as ScienceIcon,
  Speed as SpeedIcon,
  Biotech as BiotechIcon,
  Storage as StorageIcon,
  Psychology as PsychologyIcon,
  Cloud as CloudIcon
} from '@mui/icons-material';

const WorkPage = () => {
  const technologies = [
    {
      name: "Machine Learning Models",
      description: "We utilize advanced machine learning algorithms to predict drug-target interactions, allowing us to screen billions of compounds virtually.",
      icon: <PsychologyIcon fontSize="large" color="primary" />
    },
    {
      name: "Neural Networks",
      description: "Our deep neural networks analyze molecular structures to identify compounds with high potential efficacy against viral targets.",
      icon: <CloudIcon fontSize="large" color="primary" />
    },
    {
      name: "High-Throughput Screening",
      description: "We combine AI predictions with rapid laboratory testing to validate promising antiviral candidates efficiently.",
      icon: <SpeedIcon fontSize="large" color="primary" />
    },
    {
      name: "Genomic Analysis",
      description: "Advanced genomic tools help us understand viral mechanisms and identify new therapeutic targets.",
      icon: <BiotechIcon fontSize="large" color="primary" />
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Our Research
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
        MedResAI is at the forefront of combining artificial intelligence with medicinal chemistry to accelerate the discovery of novel antiviral drugs. Our innovative approach allows us to explore vast chemical spaces and identify promising drug candidates more efficiently than traditional methods.
      </Typography>

      {/* Hero Research Image */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          mb: 6,
          border: '1px solid rgba(0,0,0,0.05)',
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          alt="AI Drug Discovery Research"
          sx={{
            width: '100%',
            height: '400px',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 3
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Accelerating Medical Breakthroughs with AI
          </Typography>
          <Typography variant="body1">
            Our AI platforms analyze billions of potential compounds to identify those with the highest potential for antiviral efficacy
          </Typography>
        </Box>
      </Paper>

      {/* Research Areas */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Research Focus Areas
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {researchAreas.map((area, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'transform 0.3s',
                border: '1px solid rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={area.image}
                alt={area.title}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {area.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {area.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Our Approach */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Our Approach to Antiviral Discovery
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 6,
          border: '1px solid rgba(0,0,0,0.05)',
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(56, 142, 60, 0.05) 100%)'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Combining AI with Medicinal Chemistry
            </Typography>
            <Typography variant="body1" paragraph>
              At MedResAI, we've developed proprietary algorithms that combine the power of artificial intelligence with deep expertise in medicinal chemistry. Our approach enables us to:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ScienceIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Screen billions of compounds virtually"
                  secondary="Our AI models evaluate molecular structures to predict antiviral activity"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SpeedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Accelerate lead discovery"
                  secondary="What traditionally takes years can be accomplished in months"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StorageIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Analyze structure-activity relationships"
                  secondary="Our algorithms identify patterns that human researchers might miss"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BiotechIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Design novel molecules"
                  secondary="Generative AI creates new molecular structures optimized for synthesis and efficacy"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Research approach"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Technologies */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Our Technologies
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {technologies.map((tech, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                height: '100%',
                border: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'flex-start'
              }}
            >
              <Box sx={{ mr: 2 }}>
                {tech.icon}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {tech.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tech.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Breakthroughs */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Recent Breakthroughs
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 6,
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              SyntheMol: AI-Generated Antiviral Compounds
            </Typography>
            <Typography variant="body2" paragraph>
              Our team recently published groundbreaking research on SyntheMol, a generative AI model that designs new antiviral compounds that are both effective and easily synthesizable. This model explores a chemical space of nearly 30 billion molecules to identify promising candidates.
            </Typography>
            <Typography variant="body2" paragraph>
              Key achievements include:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Identified six structurally novel molecules with antibacterial activity" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Developed compounds effective against multiple pathogens" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Reduced discovery time from years to months" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Created a model that ensures synthesizability of generated compounds" />
              </ListItem>
            </List>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ mt: 2 }}
              component={Link}
              href="https://www.nature.com/articles/s42256-024-00809-7"
              target="_blank"
            >
              Read the research
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
              alt="AI molecule generation"
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Publications */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Recent Publications
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 6,
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <List>
          {publications.map((pub, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemText
                  primary={
                    <Link href={pub.url} color="primary" underline="hover" target="_blank" rel="noopener">
                      <Typography variant="h6" fontWeight={600}>
                        {pub.title}
                      </Typography>
                    </Link>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                        {pub.authors}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pub.journal}, {pub.year}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label="Antiviral Research"
                          size="small"
                          sx={{
                            mr: 1,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4CAF50'
                          }}
                        />
                        <Chip
                          label="AI"
                          size="small"
                          sx={{
                            mr: 1,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4CAF50'
                          }}
                        />
                        <Chip
                          label="Drug Discovery"
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            color: '#4CAF50'
                          }}
                        />
                      </Box>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < publications.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Collaborative Partners */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Collaborative Partners
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600}>Stanford University</Typography>
            <Typography variant="body2" color="text.secondary">
              Joint research on machine learning models for drug discovery
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600}>NIH</Typography>
            <Typography variant="body2" color="text.secondary">
              Funding support for advanced antiviral research initiatives
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600}>University of Buea</Typography>
            <Typography variant="body2" color="text.secondary">
              Center for Drug Discovery focused on natural product-based antivirals
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              height: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600}>McMaster University</Typography>
            <Typography variant="body2" color="text.secondary">
              Collaboration on experimental validation of AI-discovered compounds
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkPage;