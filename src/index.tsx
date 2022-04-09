import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { MainProvider } from './contexts/main';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
});

const container = document.getElementById('root') as Element ;
const root = createRoot(container);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <MainProvider>
        <App />
      </MainProvider>
    </ThemeProvider>
  </StrictMode>
);
