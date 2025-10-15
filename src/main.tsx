import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';
import AppRouter from '@/app/router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
