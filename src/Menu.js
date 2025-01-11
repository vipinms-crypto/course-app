import React, { useState } from 'react';
import './Menu.css'; 

const Menu = () => {
  return (
    <div className="sidebar">
    <ul>
      <li><a href="#dashboard">Dashboard</a></li>
      <li><a href="#courses">Courses</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#settings">Settings</a></li>
    </ul>
  </div>
  );
};

export default Menu;