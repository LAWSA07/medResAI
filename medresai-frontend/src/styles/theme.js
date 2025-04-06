import { createTheme } from '@mui/material/styles';

// Green and white color palette inspired by Disy's minimalist design
const theme = createTheme({
    palette: {
        primary: {
            main: '#2E7D32', // Forest green
            light: '#4CAF50', // Regular green
            dark: '#1B5E20', // Dark green
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#F8F9FA', // Off-white
            light: '#FFFFFF', // Pure white
            dark: '#E0E0E0', // Light gray
            contrastText: '#212121',
        },
        error: {
            main: '#D32F2F',
            light: '#EF5350',
            dark: '#C62828',
        },
        warning: {
            main: '#FFA000',
            light: '#FFB74D',
            dark: '#F57C00',
        },
        info: {
            main: '#0288D1',
            light: '#4FC3F7',
            dark: '#01579B',
        },
        success: {
            main: '#2E7D32', // Same as primary
            light: '#4CAF50',
            dark: '#1B5E20',
        },
        background: {
            default: '#FFFFFF', // Pure white background like Disy
            paper: '#FFFFFF',
        },
        text: {
            primary: '#212121', // Very dark gray (almost black)
            secondary: '#757575', // Medium gray
        },
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
        },
    },
    shape: {
        borderRadius: 8, // More subtle rounding like Disy
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '12px 24px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(46, 125, 50, 0.2)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                    },
                },
                containedSecondary: {
                    background: '#F8F9FA',
                    color: '#212121',
                    '&:hover': {
                        background: '#E0E0E0',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#2E7D32',
                    '&:hover': {
                        backgroundColor: 'rgba(46, 125, 50, 0.04)',
                        borderColor: '#1B5E20',
                    }
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 10px 40px 0 rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 50px 0 rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    '&:last-child': {
                        paddingBottom: '24px',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0 10px 40px 0 rgba(0,0,0,0.06)',
                },
                elevation2: {
                    boxShadow: '0 15px 50px 0 rgba(0,0,0,0.08)',
                },
                elevation3: {
                    boxShadow: '0 20px 60px 0 rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2E7D32',
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2E7D32',
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#2E7D32',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    backgroundColor: '#FFFFFF',
                    color: '#212121',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    margin: '4px 8px',
                    padding: '10px 16px',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(46, 125, 50, 0.08)',
                        color: '#2E7D32',
                        '&:hover': {
                            backgroundColor: 'rgba(46, 125, 50, 0.12)',
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            top: '20%',
                            height: '60%',
                            width: '4px',
                            backgroundColor: '#2E7D32',
                            borderRadius: '0 4px 4px 0',
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    margin: '16px 0',
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2E7D32',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    height: 6,
                    backgroundColor: 'rgba(46, 125, 50, 0.12)',
                },
                barColorPrimary: {
                    backgroundColor: '#2E7D32',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
                colorPrimary: {
                    backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    color: '#2E7D32',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    '&.Mui-selected': {
                        color: '#2E7D32',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#2E7D32',
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                },
            },
        },
    },
});

export default theme;
