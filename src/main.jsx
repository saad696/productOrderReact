import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { productApi } from './apis/apiSlice';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider api={productApi}>
        <App />
    </ApiProvider>
);
