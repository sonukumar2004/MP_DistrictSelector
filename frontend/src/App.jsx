import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Districts from './pages/Districts';
import About from './pages/About';
import Helpline from './pages/Helpline';
import { AuthProvider} from './context/AuthContext';

// Create a wrapper component to handle district selection state
const AppContent = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const location = useLocation();

  // Reset selected district when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setSelectedDistrict(null);
    }
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              selectedDistrict={selectedDistrict}
              onDistrictSelect={setSelectedDistrict}
            />
          } 
        />
        <Route 
          path="/districts" 
          element={
            <Districts onDistrictSelect={setSelectedDistrict} />
          } 
        />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<Helpline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;