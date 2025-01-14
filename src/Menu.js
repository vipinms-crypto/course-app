import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; 

const Menu = () => {
  return (
    <div className="sidebar">
    <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
  </div>
  );
};

export default Menu;