import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'

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
      <I18nextProvider i18n={i18n}>
        <MainProvider>
          <App />
        </MainProvider>
      </I18nextProvider>
    </ThemeProvider>
  </StrictMode>
);
