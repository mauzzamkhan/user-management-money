// src/theme.js
import { createTheme } from '@mui/material/styles';

// Custom Color Palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // blue-600 
      light: '#3b82f6', // blue-500
      dark: '#1e40af',  // blue-800
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // gray-500
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.75rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  shape: {
    borderRadius: 12, // rounded-xl
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Disable ALL CAPS
          fontWeight: 500,
          borderRadius: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
