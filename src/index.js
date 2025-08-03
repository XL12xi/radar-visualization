// filepath: c:\Users\fragm\Desktop\雷达信息可视化\src\index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'leaflet/dist/leaflet.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);