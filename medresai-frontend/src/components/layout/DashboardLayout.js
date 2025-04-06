import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, Divider, Avatar, ListItemIcon } from '@mui/material';
import { Person as PersonIcon, Dashboard as DashboardIcon, History as HistoryIcon, Science as ScienceIcon, Handshake as HandshakeIcon, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
const drawerWidth = 260;
const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        }
        catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const menuItems = [
        { text: 'Predict Your Drug', path: '/dashboard/predict', icon: _jsx(DashboardIcon, {}) },
        { text: 'Prediction History', path: '/dashboard/history', icon: _jsx(HistoryIcon, {}) },
        { text: 'Our Research', path: '/dashboard/work', icon: _jsx(ScienceIcon, {}) },
        { text: 'Our Sponsors', path: '/dashboard/sponsors', icon: _jsx(HandshakeIcon, {}) },
    ];
    return (_jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(CssBaseline, {}), _jsx(AppBar, { position: "fixed", sx: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }, children: _jsxs(Toolbar, { children: [_jsx(Typography, { variant: "h6", component: "div", sx: {
                                flexGrow: 1,
                                fontWeight: 600,
                                color: '#4CAF50',
                            }, children: "MedResAI Dashboard" }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center' }, children: [_jsx(Typography, { variant: "body2", sx: { mr: 2, fontWeight: 500 }, children: user?.name || user?.email }), _jsx(Button, { variant: "outlined", color: "primary", onClick: handleLogout, startIcon: _jsx(LogoutIcon, {}), size: "small", children: "Logout" })] })] }) }), _jsxs(Drawer, { sx: {
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                        border: 'none',
                    },
                }, variant: "permanent", anchor: "left", children: [_jsx(Box, { sx: {
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                        }, children: _jsx(Typography, { variant: "h5", fontWeight: 700, letterSpacing: "-0.02em", children: "MedResAI" }) }), _jsxs(Box, { sx: { p: 3, display: 'flex', alignItems: 'center' }, children: [_jsx(Avatar, { sx: {
                                    bgcolor: 'primary.main',
                                    mr: 2,
                                    width: 50,
                                    height: 50,
                                    boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
                                }, children: user?.name ? user.name.charAt(0).toUpperCase() : _jsx(PersonIcon, {}) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: 600, children: user?.name || 'User' }), _jsx(Typography, { variant: "body2", color: "text.secondary", noWrap: true, children: user?.email })] })] }), _jsx(Divider, {}), _jsxs(Box, { sx: { p: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", sx: { px: 1, mb: 1, fontWeight: 500 }, children: "MAIN MENU" }), _jsx(List, { children: menuItems.map((item) => (_jsx(ListItem, { disablePadding: true, sx: { mb: 1 }, children: _jsxs(ListItemButton, { component: Link, to: item.path, selected: location.pathname === item.path, sx: {
                                            borderRadius: 2,
                                            py: 1,
                                        }, children: [_jsx(ListItemIcon, { sx: {
                                                    minWidth: 40,
                                                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                                                }, children: item.icon }), _jsx(ListItemText, { primary: item.text, primaryTypographyProps: {
                                                    fontWeight: location.pathname === item.path ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                } })] }) }, item.text))) })] }), _jsx(Divider, {}), _jsxs(Box, { sx: { p: 2 }, children: [_jsx(Typography, { variant: "body2", color: "text.secondary", sx: { px: 1, mb: 1, fontWeight: 500 }, children: "ACCOUNT" }), _jsx(List, { children: _jsx(ListItem, { disablePadding: true, sx: { mb: 1 }, children: _jsxs(ListItemButton, { component: Link, to: "/dashboard/profile", selected: location.pathname === '/dashboard/profile', sx: {
                                            borderRadius: 2,
                                            py: 1,
                                        }, children: [_jsx(ListItemIcon, { sx: {
                                                    minWidth: 40,
                                                    color: location.pathname === '/dashboard/profile' ? 'primary.main' : 'text.secondary',
                                                }, children: _jsx(SettingsIcon, {}) }), _jsx(ListItemText, { primary: "My Profile", primaryTypographyProps: {
                                                    fontWeight: location.pathname === '/dashboard/profile' ? 600 : 500,
                                                    fontSize: '0.9rem',
                                                } })] }) }) })] }), _jsx(Box, { sx: { flexGrow: 1 } }), _jsxs(Box, { sx: {
                            p: 2,
                            mx: 2,
                            mb: 2,
                            borderRadius: 3,
                            bgcolor: 'rgba(76, 175, 80, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }, children: [_jsx(Typography, { variant: "subtitle2", fontWeight: 600, textAlign: "center", gutterBottom: true, children: "Need Help?" }), _jsx(Typography, { variant: "caption", color: "text.secondary", textAlign: "center", gutterBottom: true, children: "Contact our support team" }), _jsx(Button, { variant: "contained", color: "primary", size: "small", sx: { mt: 1 }, onClick: () => window.open('mailto:support@medresai.com'), children: "Contact Support" })] })] }), _jsxs(Box, { component: "main", sx: {
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    width: `calc(100% - ${drawerWidth}px)`
                }, children: [_jsx(Toolbar, {}), children] })] }));
};
export default DashboardLayout;
