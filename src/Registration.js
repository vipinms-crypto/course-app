import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import './Registration.css'
import axios from 'axios'

const Container = styled.div`
 padding: 20px;
  margin: 0 auto;
  max-width: 60%;
  background-color: skyblue;
  font-family: Arial, sans-serif;
`;
// const cors = require('cors');

const Registration = () => {
  const [formData, setFormData] = useState({

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // axios.use(cors);
      const response = await axios.post('http://localhost:8765/user-service/api/register', formData,{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      alert("Registration successfull. Please do login with your credentials..!");
      navigate('/login');
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('There was an error registering:', error);
    }
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
    <div className="form-item">
      <label>First Name:</label>
      <input
        type="text"
        name="userFirstName"
        value={formData.userFirstName}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Middle Name:</label>
      <input
        type="text"
        name="userMiddleName"
        value={formData.userMiddleName}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Last Name:</label>
      <input
        type="text"
        name="userLastName"
        value={formData.userLastName}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>User Name:</label>
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Password:</label>
      <input
        type="password"
        name="userPassword"
        value={formData.userPassword}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Email:</label>
      <input
        type="email"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Phone:</label>
      <input
        type="tel"
        name="userPhone"
        value={formData.userPhone}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Address Line1:</label>
      <input
        type="text"
        name="userAddressLine1"
        value={formData.userAddressLine1}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <label>Address Line2:</label>
      <input
        type="text"
        name="userAddressLine2"
        value={formData.userAddressLine2}
        onChange={handleChange}
        required
      />
    </div>
  
    <div className="form-item">
      <button type="submit">Register</button>
      <button type="button" onClick={handleBackClick}>Back</button>
    </div>
  </form>
  );
};

export default Registration;