import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 19
import App from './App';
// import './styles/index.css'; // If you decide to use a separate CSS file for global styles or Tailwind base

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element with ID 'root' to mount the React application.");
}

const root = createRoot(rootElement); // Use createRoot from react-dom/client
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);