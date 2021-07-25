import React from 'react';
import ReactDOM from 'react-dom';

// Component imports
import App from './components/App';

// CSS imports
import './css/index.css';
import './css/app.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);