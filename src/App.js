// import React from 'react';
// import Login from './Login';
// import './Login.css';


// const App = () => {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Menu from './Menu';
import './Login.css';
import CourseList from './course/components/Courselist.js'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Menu />
            <div className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/profile"  />
                <Route path="/settings" />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;