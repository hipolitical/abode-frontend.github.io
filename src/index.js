import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import store from './store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002C77',
    },
    secondary: {
      main: '#000000',
      light: '#202020',
    },
    grey: {
      main: 'rgba(32, 32, 32, 0.26)',
      light: 'rgba(224, 224, 224, 1)',
      lighter: 'rgba(246, 246, 246, 1)',
    }
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
