import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, useTheme, Link, } from '@mui/material';
import { Dashboard as DashboardIcon, Assessment as AssessmentIcon, History as HistoryIcon, Person as PersonIcon, Settings as SettingsIcon, Logout as LogoutIcon, Help as HelpIcon, Science as ScienceIcon, } from '@mui/icons-material';
const links = [
    { name: 'Dashboard', href: '/dashboard', icon: _jsx(DashboardIcon, {}) },
    { name: 'Predictions', href: '/dashboard/predictions', icon: _jsx(AssessmentIcon, {}) },
    { name: 'History', href: '/dashboard/history', icon: _jsx(HistoryIcon, {}) },
    { name: 'Research', href: '/dashboard/research', icon: _jsx(ScienceIcon, {}) },
];
const Sidebar = () => {
    const location = useLocation();
    const theme = useTheme();
    return (_jsx(Drawer, { variant: "permanent", sx: {
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                border: 'none',
                backgroundColor: theme.palette.background.default,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
            },
        }, children: _jsxs(Box, { sx: { p: 2, display: 'flex', flexDirection: 'column', height: '100%' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', mb: 4 }, children: [_jsx(Box, { component: "img", src: "/logo.png", alt: "MedResAI", sx: { height: 40, mr: 1 } }), _jsx(Typography, { variant: "h6", fontWeight: "bold", color: "primary", children: "MedResAI" })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', mb: 4 }, children: [_jsx(Avatar, { sx: { width: 40, height: 40, mr: 2, bgcolor: theme.palette.primary.main }, children: _jsx(PersonIcon, {}) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle1", fontWeight: "medium", children: "Dr. Jane Smith" }), _jsx(Typography, { variant: "caption", color: "text.secondary", children: "Researcher" })] })] }), _jsx(Divider, { sx: { mb: 2 } }), _jsx(List, { sx: { flex: 1 }, children: links.map((link) => (_jsx(ListItem, { disablePadding: true, sx: { mb: 1 }, children: _jsxs(ListItemButton, { component: RouterLink, to: link.href, selected: location.pathname === link.href, sx: {
                                borderRadius: 2,
                                '&.Mui-selected': {
                                    backgroundColor: `${theme.palette.primary.main}15`,
                                    '&:hover': {
                                        backgroundColor: `${theme.palette.primary.main}25`,
                                    },
                                },
                            }, children: [_jsx(ListItemIcon, { sx: { minWidth: 40, color: location.pathname === link.href ? theme.palette.primary.main : 'inherit' }, children: link.icon }), _jsx(ListItemText, { primary: link.name, primaryTypographyProps: {
                                        fontWeight: location.pathname === link.href ? 'medium' : 'regular'
                                    } })] }) }, link.name))) }), _jsx(Divider, { sx: { my: 2 } }), _jsxs(List, { children: [_jsx(ListItem, { disablePadding: true, sx: { mb: 1 }, children: _jsxs(ListItemButton, { sx: { borderRadius: 2 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 40 }, children: _jsx(SettingsIcon, {}) }), _jsx(ListItemText, { primary: "Settings" })] }) }), _jsx(ListItem, { disablePadding: true, children: _jsxs(ListItemButton, { sx: { borderRadius: 2 }, children: [_jsx(ListItemIcon, { sx: { minWidth: 40 }, children: _jsx(LogoutIcon, {}) }), _jsx(ListItemText, { primary: "Logout" })] }) })] }), _jsxs(Box, { sx: { mt: 4, p: 2, backgroundColor: `${theme.palette.primary.main}08`, borderRadius: 2 }, children: [_jsx(Typography, { variant: "subtitle2", fontWeight: "medium", gutterBottom: true, children: "Need help?" }), _jsx(Typography, { variant: "body2", color: "text.secondary", paragraph: true, sx: { fontSize: '0.8rem' }, children: "Contact our support team for assistance." }), _jsxs(Link, { component: RouterLink, to: "/support", sx: {
                                display: 'flex',
                                alignItems: 'center',
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                fontWeight: 'medium',
                                fontSize: '0.8rem',
                            }, children: [_jsx(HelpIcon, { sx: { mr: 0.5, fontSize: '0.9rem' } }), "Support Center"] })] })] }) }));
};
export default Sidebar;
