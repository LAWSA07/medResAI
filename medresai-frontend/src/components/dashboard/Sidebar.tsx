import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  useTheme,
  Link,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Help as HelpIcon,
  Science as ScienceIcon,
  Science as ChemistryIcon,
} from '@mui/icons-material';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
  { name: 'Predictions', href: '/dashboard/predictions', icon: <AssessmentIcon /> },
  { name: 'History', href: '/dashboard/history', icon: <HistoryIcon /> },
  { name: 'Research', href: '/dashboard/research', icon: <ScienceIcon /> },
  { name: 'Molecule Viewer', href: '/molecules', icon: <ChemistryIcon /> },
];

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: theme.palette.background.default,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="MedResAI"
            sx={{ height: 40, mr: 1 }}
          />
          <Typography variant="h6" fontWeight="bold" color="primary">
            MedResAI
          </Typography>
        </Box>

        {/* User info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: theme.palette.primary.main }}>
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">Dr. Jane Smith</Typography>
            <Typography variant="caption" color="text.secondary">Researcher</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Navigation */}
        <List sx={{ flex: 1 }}>
          {links.map((link) => (
            <ListItem key={link.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={link.href}
                selected={location.pathname === link.href}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: `${theme.palette.primary.main}15`,
                    '&:hover': {
                      backgroundColor: `${theme.palette.primary.main}25`,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: location.pathname === link.href ? theme.palette.primary.main : 'inherit' }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText
                  primary={link.name}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === link.href ? 'medium' : 'regular'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Bottom actions */}
        <List>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Support section */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: `${theme.palette.primary.main}08`, borderRadius: 2 }}>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            Need help?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.8rem' }}>
            Contact our support team for assistance.
          </Typography>
          <Link
            component={RouterLink}
            to="/support"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontWeight: 'medium',
              fontSize: '0.8rem',
            }}
          >
            <HelpIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
            Support Center
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;