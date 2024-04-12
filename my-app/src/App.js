import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessGame from './BuisnessGame'; // Основной код игры
import LocationPage from './World2'; // Страница новой локации

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusinessGame />} />
        <Route path="/location" element={<LocationPage />} />
      </Routes>
    </Router>
  );
};

export default App;