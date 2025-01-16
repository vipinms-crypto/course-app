import React, { useState, useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './css/table-list.css'; 
import Menu from './Menu';
import CourseList from './course/components/Courselist.js'

const Dashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const courseUserId = localStorage.getItem('userId');
    const searchCriteria = {
      searchObject: {
        inputType :"Integer",
        inputKey :"userCourseMappingUserId",
        inputValue :courseUserId,
      },
    };
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(apiUrl+'/courses/user/mapping/search',
          searchCriteria,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let courseDataList = { data: [] };
        if (response.data  && Array.isArray(response.data) && response.data.length > 0) {
        const  courseResponse = await axios.post(apiUrl+'/courses/search',
            searchCriteria,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          courseDataList = courseResponse;
        }
        setData(courseDataList.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Menu/>
      <Routes>
          <Route path="/dashboard"  />
          <Route path="/courses" element={<CourseList/>} />
          <Route path="/profile"  />
          <Route path="/settings"  />
        </Routes>
      <div className="main-content">
        <h1>Dashboard</h1>
        {data ? (
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>No. Of Modules</th>
                <th>Course Duration</th>
                <th>Action</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.courseId}>
                  <td>{item.courseCode}</td>
                  <td>{item.courseName}</td>
                  <td>{item.courseDescription}</td>
                  <td>{item.courseNoModules}</td>
                  <td>{item.courseDuration}</td>
                  <td><button>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;