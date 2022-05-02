import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from './contexts/main';
import i18n from './i18n'
import App from './App';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
});

const container = document.getElementById('root') as Element ;
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <MainProvider>
            <App />
          </MainProvider>
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
