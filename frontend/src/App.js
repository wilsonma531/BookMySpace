import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserLayout from './UserLayout';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (e.g., by checking localStorage)
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', 'authenticated');
    console.log(isAuthenticated)
    console.log('User Authorised! Redirect to Dashboard...');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/*" 
          element={isAuthenticated ? <UserLayout /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;