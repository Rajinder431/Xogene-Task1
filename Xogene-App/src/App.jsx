import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DrugSearch from './pages/DrugSearch';
import DrugDetails from './pages/DrugDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect / to /drugs/search */}
        <Route path="/" element={<Navigate to="/drugs/search" />} />
        <Route path="/drugs/search" element={<DrugSearch />} />
        <Route path="/drugs/:drugName" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
