import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './App.css'; // Import the CSS file
import homeIcon from './nav/home.png';
import reservationIcon from './nav/res.png';
import historyIcon from './nav/history.png';
import settingIcon from './nav/setting.png';

const Navbar = () => {
  return (
    // <div className="navbar">
    //   <Link to="/" className="nav-item">Home</Link>
    //   <Link to="/reservation" className="nav-item">Reservation</Link>
    //   <Link to="/history" className="nav-item">History</Link>
    //   <Link to="/setting" className="nav-item">Settings</Link>
    // </div>
    <div className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <img src={homeIcon} alt="Home" className="nav-icon" />
      <span>Home</span>
      </NavLink>
      <NavLink to="/reservation" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <img src={reservationIcon} alt="Reservation" className="nav-icon" />
      <span>Reservation</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <img src={historyIcon} alt="History" className="nav-icon" />
      <span>History</span>
      </NavLink>
      <NavLink to="/setting" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
      <img src={settingIcon} alt="Setting" className="nav-icon" />
      <span>Settings</span>
      </NavLink>
    </div>
  );
};

export default Navbar;
