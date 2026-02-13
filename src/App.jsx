import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EntrepreneursPage from './pages/EntrepreneursPage';
import StartupsPage from './pages/StartupsPage';
import InvestorsPage from './pages/InvestorsPage';
import GovernmentsPage from './pages/GovernmentsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
        <Route path="/startups" element={<StartupsPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/governments" element={<GovernmentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
