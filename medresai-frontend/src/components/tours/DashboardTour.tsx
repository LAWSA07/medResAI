import React, { useState } from 'react';
import Tour from 'reactour';
import { Typography, Button, Box, useTheme } from '@mui/material';

// Define the tour steps
const tourSteps = [
  {
    selector: '[data-tour="dashboard-header"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Welcome to MedResAI!</Typography>
        <Typography variant="body2">
          This tour will guide you through the main features of our dashboard.
          Let's start exploring!
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="custom-dashboard"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Customizable Dashboard</Typography>
        <Typography variant="body2">
          This is your personalized dashboard. You can drag and rearrange widgets,
          resize them, and add new ones according to your preferences.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="add-widget-button"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Add Widgets</Typography>
        <Typography variant="body2">
          Click this button to add new widgets to your dashboard. Choose from
          molecule viewers, prediction tools, research stats, and more.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="molecule-widget"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Molecule Viewer Widget</Typography>
        <Typography variant="body2">
          This widget allows you to visualize molecules in 3D. Click "Go to Full Viewer"
          to access the complete molecular visualization tool.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="predictions-widget"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Recent Predictions</Typography>
        <Typography variant="body2">
          Track your recent prediction activities here. Click on any prediction
          to see detailed results and analysis.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="research-widget"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Research Tools</Typography>
        <Typography variant="body2">
          Quick access to essential research tools and resources to enhance
          your scientific workflow.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="stats-widget"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Research Stats</Typography>
        <Typography variant="body2">
          Monitor your research metrics and performance statistics to track your progress.
        </Typography>
      </Box>
    )
  },
  {
    selector: '[data-tour="navigation"]',
    content: () => (
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Navigation</Typography>
        <Typography variant="body2">
          Use the sidebar to navigate between different sections of the application,
          including predictions, molecule visualization, and your profile.
        </Typography>
      </Box>
    )
  }
];

// Tour component with custom styling
interface DashboardTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardTour: React.FC<DashboardTourProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();

  // Customize tour styling
  const tourStyles = {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
    color: theme.palette.text.primary
  };

  // Customize mask
  const maskStyles = {
    color: theme.palette.primary.main,
    opacity: 0.7
  };

  return (
    <Tour
      steps={tourSteps}
      isOpen={isOpen}
      onRequestClose={onClose}
      closeWithMask={false}
      showNavigation={true}
      showNavigationNumber={false}
      disableDotsNavigation={false}
      disableKeyboardNavigation={false}
      rounded={8}
      accentColor={theme.palette.primary.main}
      styles={{
        maskArea: (base: any) => ({ ...base, ...maskStyles }),
        popover: (base: any) => ({ ...base, ...tourStyles }),
      }}
    />
  );
};

export default DashboardTour;