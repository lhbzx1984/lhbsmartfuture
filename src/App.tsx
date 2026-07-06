import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import CanvasApp from './CanvasApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/canvas" element={<CanvasApp />} />
      </Routes>
    </BrowserRouter>
  );
}
