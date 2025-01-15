import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';
import axios from 'axios'
import './Login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const response = await axios.post('http://localhost:8765/user-service/api/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('There was an error while lohin:', error);
    }


  };
const navigate = useNavigate();

  const handleRegistration = () => {
    setShowRegistration(true);
    navigate('/registration',{ replace: true });
  };

  return (
    <div>

{!showRegistration ? (
    
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-item">
      <button type="submit">Login</button>
      <button type="button" onClick={handleRegistration}>Register</button>
    </div>
        
      </form>
      
    </div>
    ) : (
      <Registration />
    )}
    </div>
  );
};

export default Login;