import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './main.scss'
import App from './App';

import { Provider } from 'react-redux';
import store from './store/index';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import alertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={alertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
