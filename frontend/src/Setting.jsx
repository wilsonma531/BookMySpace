import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
//import './App.css';

function Setting() {
  return (
    <div>
      <div style={{left: 43, top: 82, position: 'absolute', color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '900', textTransform: 'uppercase', wordWrap: 'break-word'}}>Setting</div>
      <div style={{left: 44, top: 150, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Inter', fontWeight: '300', textTransform: 'uppercase', wordWrap: 'break-word'}}>
      <Link to="/Login">Logout</Link>
      </div>
    </div>
      
  );
}

export default Setting;