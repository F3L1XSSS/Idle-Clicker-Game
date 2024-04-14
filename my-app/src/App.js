import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusinessGame from './BuisnessGame'; // Основной код игры
import LocationPage from './World2'; // Страница новой локации
import SpacePage from './Space'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusinessGame />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path='/space' element={<SpacePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
