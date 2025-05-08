import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter importieren

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* App Komponente mit BrowserRouter umschließen */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
