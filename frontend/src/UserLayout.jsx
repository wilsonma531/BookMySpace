import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

// Import your tab content components
import UserDashboard from './UserDashboard';
import UserReservaton from './UserReservation';
import UserHistory from './UserHistory';
import Setting from './Setting';
import Navbar from './NavBar';
import './App.css'; // Import the CSS file


function UserLayout() {
  return (
    <div className="app-container">
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/reservation" element={<UserReservaton />} />
            <Route path="/history" element={<UserHistory />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
          <Navbar/>
      </div>
  );
}

export default UserLayout;