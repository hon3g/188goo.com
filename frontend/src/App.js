import HomePage from './pages/homepage/homepage.component';
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/:args' element={<HomePage />} />
    </Routes>
  );
}

export default App;
