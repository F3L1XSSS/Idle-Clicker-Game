import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BusinessGamePage from '../pages/BusinessGamePage'; // Основной код игры
import World2Page from '../pages/World2Page'; // Страница новой локации
import SpacePage from '../pages/SpacePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusinessGamePage />} />
        <Route path="/location" element={<World2Page />} />
        <Route path="/space" element={<SpacePage />} />
      </Routes>
    </Router>
  );
};

export default App;
