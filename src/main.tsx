import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import './index.css';

import { AppProvider } from '@/providers/AppProvider';
import { theme } from './libs/theme.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MainRouter } from './routes/MainRouter.js';

if ('serviceWorker' in navigator) {
  console.log('Service Worker registration failed: ', navigator);
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    })
    .catch(function (err) {
      console.log('Service Worker registration failed: ', err);
    });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <MainRouter />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
