import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  Avatar,
  IconButton,
  ListItemIcon
} from '@mui/material';
import {
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Science as ScienceIcon,
  Handshake as HandshakeIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Biotech as BiotechIcon,
  ViewQuilt as ViewQuiltIcon,
  Science as PredictIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 260;

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { text: 'Custom Dashboard', path: '/dashboard/custom', icon: <ViewQuiltIcon /> },
    { text: 'Predict Your Drug', path: '/dashboard/predict', icon: <DashboardIcon /> },
    { text: 'Advanced Predictor', path: '/dashboard/predict-advanced', icon: <PredictIcon /> },
    { text: 'Prediction History', path: '/dashboard/history', icon: <HistoryIcon /> },
    { text: 'Molecule Viewer', path: '/molecules', icon: <BiotechIcon /> },
    { text: 'Our Research', path: '/dashboard/work', icon: <ScienceIcon /> },
    { text: 'Our Sponsors', path: '/dashboard/sponsors', icon: <HandshakeIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: '#4CAF50',
            }}
          >
            MedResAI Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2, fontWeight: 500 }}>
              {user?.name || user?.email}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              size="small"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: 'none',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#4CAF50',
            color: 'white',
          }}
        >
          <Typography variant="h5" fontWeight={700} letterSpacing="-0.02em">
            MedResAI
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              mr: 2,
              width: 50,
              height: 50,
              boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1, mb: 1, fontWeight: 500 }}>
            MAIN MENU
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      fontSize: '0.9rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1, mb: 1, fontWeight: 500 }}>
            ACCOUNT
          </Typography>
          <List>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to="/dashboard/profile"
                selected={location.pathname === '/dashboard/profile'}
                sx={{
                  borderRadius: 2,
                  py: 1,
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 40,
                  color: location.pathname === '/dashboard/profile' ? 'primary.main' : 'text.secondary',
                }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="My Profile"
                  primaryTypographyProps={{
                    fontWeight: location.pathname === '/dashboard/profile' ? 600 : 500,
                    fontSize: '0.9rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            p: 2,
            mx: 2,
            mb: 2,
            borderRadius: 3,
            bgcolor: 'rgba(76, 175, 80, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} textAlign="center" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="caption" color="text.secondary" textAlign="center" gutterBottom>
            Contact our support team
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => window.open('mailto:support@medresai.com')}
          >
            Contact Support
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;