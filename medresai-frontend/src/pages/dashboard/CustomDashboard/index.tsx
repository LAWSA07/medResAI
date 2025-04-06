import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Menu,
  MenuItem,
  Grid,
  useTheme,
  alpha,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Biotech as BiotechIcon,
  Science as ScienceIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DashboardTour from '../../../components/tours/DashboardTour';

// Make the grid responsive
const ResponsiveGridLayout = WidthProvider(Responsive);

// Widget components
const MoleculeViewerWidget = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2
      }}
      data-tour="molecule-widget"
    >
      <CardHeader
        title="Molecule Viewer"
        subheader="3D visualization"
        avatar={<BiotechIcon color="primary" />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': {
            fontSize: '1rem',
            fontWeight: 600
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.8rem'
          }
        }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            p: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            3D molecule visualization will be displayed here.
            <Button
              component="a"
              href="/molecules"
              size="small"
              color="primary"
              sx={{ display: 'block', mt: 1 }}
            >
              Go to Full Viewer
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const PredictionsWidget = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2
      }}
      data-tour="predictions-widget"
    >
      <CardHeader
        title="Recent Predictions"
        subheader="Last 5 predictions"
        avatar={<TimelineIcon color="primary" />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': {
            fontSize: '1rem',
            fontWeight: 600
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.8rem'
          }
        }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box
            key={item}
            sx={{
              p: 1,
              mb: 1,
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Prediction #{item}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Antiviral compound: TGAC-{Math.floor(Math.random() * 1000)}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

const ResearchToolsWidget = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2
      }}
      data-tour="research-widget"
    >
      <CardHeader
        title="Research Tools"
        subheader="Quick access"
        avatar={<ScienceIcon color="primary" />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': {
            fontSize: '1rem',
            fontWeight: 600
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.8rem'
          }
        }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={1}>
          {['Molecule Viewer', 'Predictor', 'Genome Analysis', 'Literature Search'].map((tool) => (
            <Grid item xs={6} key={tool}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  mb: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                {tool}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const StatsWidget = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2
      }}
      data-tour="stats-widget"
    >
      <CardHeader
        title="Research Stats"
        subheader="Your activity"
        avatar={<TrendingUpIcon color="primary" />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': {
            fontSize: '1rem',
            fontWeight: 600
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.8rem'
          }
        }}
      />
      <Divider />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          {[
            { title: 'Predictions', value: '24', color: '#4CAF50' },
            { title: 'Accuracy', value: '92%', color: '#2196F3' },
            { title: 'Discoveries', value: '3', color: '#F44336' },
            { title: 'Projects', value: '7', color: '#FF9800' }
          ].map((stat) => (
            <Grid item xs={6} key={stat.title}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: alpha(stat.color, 0.1),
                  textAlign: 'center'
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Available widgets configuration
const availableWidgets = [
  { id: 'molecules', title: 'Molecule Viewer', component: MoleculeViewerWidget, icon: <BiotechIcon /> },
  { id: 'predictions', title: 'Recent Predictions', component: PredictionsWidget, icon: <TimelineIcon /> },
  { id: 'research', title: 'Research Tools', component: ResearchToolsWidget, icon: <ScienceIcon /> },
  { id: 'stats', title: 'Research Stats', component: StatsWidget, icon: <TrendingUpIcon /> }
];

// Main Dashboard Component
const CustomDashboard: React.FC = () => {
  const theme = useTheme();

  // State for the layout
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'molecules', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 4 },
      { i: 'predictions', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 4 },
      { i: 'research', x: 0, y: 8, w: 4, h: 7, minW: 3, minH: 4 },
      { i: 'stats', x: 4, y: 8, w: 8, h: 7, minW: 4, minH: 4 }
    ],
    md: [
      { i: 'molecules', x: 0, y: 0, w: 6, h: 8, minW: 3, minH: 4 },
      { i: 'predictions', x: 6, y: 0, w: 6, h: 8, minW: 3, minH: 4 },
      { i: 'research', x: 0, y: 8, w: 5, h: 7, minW: 3, minH: 4 },
      { i: 'stats', x: 5, y: 8, w: 7, h: 7, minW: 3, minH: 4 }
    ],
    sm: [
      { i: 'molecules', x: 0, y: 0, w: 6, h: 7, minW: 3, minH: 4 },
      { i: 'predictions', x: 0, y: 7, w: 6, h: 7, minW: 3, minH: 4 },
      { i: 'research', x: 0, y: 14, w: 6, h: 6, minW: 3, minH: 4 },
      { i: 'stats', x: 0, y: 20, w: 6, h: 6, minW: 3, minH: 4 }
    ],
    xs: [
      { i: 'molecules', x: 0, y: 0, w: 4, h: 7, minW: 2, minH: 4 },
      { i: 'predictions', x: 0, y: 7, w: 4, h: 7, minW: 2, minH: 4 },
      { i: 'research', x: 0, y: 14, w: 4, h: 6, minW: 2, minH: 4 },
      { i: 'stats', x: 0, y: 20, w: 4, h: 6, minW: 2, minH: 4 }
    ]
  });

  // State for active widgets
  const [activeWidgets, setActiveWidgets] = useState([
    'molecules', 'predictions', 'research', 'stats'
  ]);

  // State for widget selector menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // State for tour
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Check if it's the first visit to show the tour automatically
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
    if (!hasSeenTour) {
      setIsTourOpen(true);
      localStorage.setItem('hasSeenDashboardTour', 'true');
    }
  }, []);

  // Handle layout changes
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    setLayouts(allLayouts);
    // You could save the layout to localStorage or a backend here
  };

  // Handle removing widgets
  const handleRemoveWidget = (widgetId: string) => {
    setActiveWidgets(activeWidgets.filter(id => id !== widgetId));
  };

  // Handle adding widgets
  const handleAddWidget = (widgetId: string) => {
    if (!activeWidgets.includes(widgetId)) {
      setActiveWidgets([...activeWidgets, widgetId]);
      setAnchorEl(null);
    }
  };

  // Handle closing tour
  const closeTour = () => {
    setIsTourOpen(false);
  };

  return (
    <Box sx={{ p: 3 }} data-tour="custom-dashboard">
      {/* Dashboard Tour */}
      <DashboardTour isOpen={isTourOpen} onClose={closeTour} />

      {/* Dashboard Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
        data-tour="dashboard-header"
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Custom Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Customize your dashboard by adding widgets and rearranging them.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Start guided tour">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsTourOpen(true)}
              startIcon={<HelpOutlineIcon />}
            >
              Help
            </Button>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            data-tour="add-widget-button"
          >
            Add Widget
          </Button>
        </Box>

        {/* Widget Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {availableWidgets.map((widget) => (
            <MenuItem
              key={widget.id}
              onClick={() => handleAddWidget(widget.id)}
              disabled={activeWidgets.includes(widget.id)}
              sx={{
                minWidth: 200,
                color: activeWidgets.includes(widget.id) ? 'text.disabled' : 'text.primary'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 1 }}>{widget.icon}</Box>
                {widget.title}
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Grid Layout */}
      <Box sx={{ mt: 2 }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
          rowHeight={40}
          onLayoutChange={handleLayoutChange}
          isDraggable
          isResizable
          draggableHandle=".MuiCardHeader-root"
        >
          {activeWidgets.map(widgetId => {
            const widget = availableWidgets.find(w => w.id === widgetId);
            if (!widget) return null;

            const WidgetComponent = widget.component;

            return (
              <Box key={widgetId} sx={{ overflow: 'hidden', height: '100%' }}>
                <Paper
                  sx={{
                    height: '100%',
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 10,
                      m: 0.5,
                      backgroundColor: alpha(theme.palette.background.paper, 0.7),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.9),
                      }
                    }}
                    onClick={() => handleRemoveWidget(widgetId)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <WidgetComponent />
                </Paper>
              </Box>
            );
          })}
        </ResponsiveGridLayout>
      </Box>
    </Box>
  );
};

export default CustomDashboard;