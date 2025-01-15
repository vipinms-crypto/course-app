import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/table-list.css';

const Courselist = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleEnroll = async (e,courseId ) =>{
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const userCourseMapping = {
      userCourseMappingUserId: userId,
      userCourseMappingCourseId: courseId,
    };
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8765/courses/user/mapping', 
        userCourseMapping,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );     
      alert("User successfully enrolled into a new course");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      alert(`Error: ${errorMessage}`);
      console.error('There was an error while lohin:', error);
    }
  };
  
const handleClick = () =>{
  navigate('/Addcourse');
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8765/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, 
  
  []);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Courses</h1>
        <><button onClick={handleClick}>Add COurse</button></>
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
                  <td><button onClick={(e) => handleEnroll(e, item.courseId)}>Enroll</button></td>
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

export default Courselist;