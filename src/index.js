import React from 'react';
import ReactDOM from 'react-dom/client';  // Note the new import
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create the root element
root.render(  // Render the App
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
