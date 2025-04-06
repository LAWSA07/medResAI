import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // Green
            light: '#80E27E',
            dark: '#087f23',
            contrastText: '#fff',
        },
        secondary: {
            main: '#F5F5F5', // Light gray
            light: '#FFFFFF',
            dark: '#E0E0E0',
            contrastText: '#424242',
        },
        error: {
            main: '#F44336', // Red
            light: '#E57373',
            dark: '#D32F2F',
        },
        warning: {
            main: '#FFC107', // Amber
            light: '#FFD54F',
            dark: '#FFA000',
        },
        info: {
            main: '#2196F3', // Blue
            light: '#64B5F6',
            dark: '#1976D2',
        },
        success: {
            main: '#4CAF50', // Green
            light: '#81C784',
            dark: '#388E3C',
        },
        background: {
            default: '#FAFAFA', // Very light gray
            paper: '#FFFFFF',
        },
        text: {
            primary: '#212121', // Very dark gray
            secondary: '#757575', // Medium gray
        },
    },
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: 600,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 22px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    },
                },
                containedPrimary: {
                    background: '#4CAF50',
                    '&:hover': {
                        background: '#388E3C',
                    },
                },
                containedSecondary: {
                    background: '#F5F5F5',
                    color: '#212121',
                    '&:hover': {
                        background: '#E0E0E0',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                },
                elevation2: {
                    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 12px 32px 0 rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                    backgroundColor: '#FFFFFF',
                    color: '#212121',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid rgba(0,0,0,0.05)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        color: '#4CAF50',
                        '&:hover': {
                            backgroundColor: 'rgba(76, 175, 80, 0.15)',
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    margin: '8px 0',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#4CAF50',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    height: 8,
                },
                barColorPrimary: {
                    backgroundColor: '#4CAF50',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                colorPrimary: {
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    color: '#4CAF50',
                },
            },
        },
    },
});
export default theme;
