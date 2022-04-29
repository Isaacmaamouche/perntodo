import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, WuiProvider } from '@welcome-ui/core';
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <WuiProvider theme={theme}>
      <App />
    </WuiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
