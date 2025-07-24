import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import { ColorModeProvider, useColorModeTheme } from '@/theme';

const queryClient = new QueryClient();

function Root() {
  const { theme } = useColorModeTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={2600} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <Root />
    </ColorModeProvider>
  </React.StrictMode>,
);