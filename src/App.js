import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home.js';
import './Home.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona da raiz '/' para a página desejada, ex: '/dashboard' */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
