import React, { useState } from 'react';
import '../../css/form.css'; 
import axios from 'axios';

const Addcourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    courseDescription: '',
    courseNoModules: 0,
    courseDuration: 0,
    componentRequestDto: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleComponentChange = (index, e) => {
    const { name, value } = e.target;
    const components = [...courseData.componentRequestDto];
    components[index] = {
      ...components[index],
      [name]: value
    };
    setCourseData({
      ...courseData,
      componentRequestDto: components
    });
  };

  const handleChapterChange = (componentIndex, chapterIndex, e) => {
    const { name, value } = e.target;
    const components = [...courseData.componentRequestDto];
    const chapters = [...components[componentIndex].chapterRequestDto];
    chapters[chapterIndex] = {
      ...chapters[chapterIndex],
      [name]: value
    };
    components[componentIndex].chapterRequestDto = chapters;
    setCourseData({
      ...courseData,
      componentRequestDto: components
    });
  };

  const addComponent = () => {
    setCourseData({
      ...courseData,
      componentRequestDto: [
        ...courseData.componentRequestDto,
        {
          componentName: '',
          componentCode: '',
          componentDescription: '',
          componentNoChapters: 0,
          componentDuration: 0,
          chapterRequestDto: []
        }
      ]
    });
  };

  const removeComponent = (index) => {
    const components = [...courseData.componentRequestDto];
    components.splice(index, 1);
    setCourseData({
      ...courseData,
      componentRequestDto: components
    });
  };

  const addChapter = (componentIndex) => {
    const components = [...courseData.componentRequestDto];
    components[componentIndex].chapterRequestDto.push({
      chapterName: '',
      chapterCode: '',
      chapterDescription: '',
      chapterDuration: 0
    });
    setCourseData({
      ...courseData,
      componentRequestDto: components
    });
  };

  const removeChapter = (componentIndex, chapterIndex) => {
    const components = [...courseData.componentRequestDto];
    components[componentIndex].chapterRequestDto.splice(chapterIndex, 1);
    setCourseData({
      ...courseData,
      componentRequestDto: components
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8765/courses', courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Course successfully saved');
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
      console.error('There was an error saving the course:', error);
    }
  };

  return (
    <div className="main-content">
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="course-block">
          <div className="form-row">
            <div>
              <label>Course Name:</label>
              <input type="text" name="courseName" className="course-input" onChange={handleChange} />
            </div>
            <div>
              <label>Course Code:</label>
              <input type="text" name="courseCode" className="course-input" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Course Description:</label>
              <input type="text" name="courseDescription" className="course-input" onChange={handleChange} />
            </div>
            <div>
              <label>Number of Modules:</label>
              <input type="number" name="courseNoModules" className="course-input" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Course Duration:</label>
              <input type="number" name="courseDuration" className="course-input" onChange={handleChange} />
            </div>
          </div>
          <button type="button" onClick={addComponent}>Add Module</button>
        </div>
        
        {courseData.componentRequestDto.map((component, index) => (
          <div key={index} className="component-block">
            <h3>Module {index + 1}</h3>
            <div className="form-row">
              <div>
                <label>Module Name:</label>
                <input type="text" name="componentName" className="component-input" onChange={(e) => handleComponentChange(index, e)} />
              </div>
              <div>
                <label>Module Code:</label>
                <input type="text" name="componentCode" className="component-input" onChange={(e) => handleComponentChange(index, e)} />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Module Description:</label>
                <input type="text" name="componentDescription" className="component-input" onChange={(e) => handleComponentChange(index, e)} />
              </div>
              <div>
                <label>Number of Chapters:</label>
                <input type="number" name="componentNoChapters" className="component-input" onChange={(e) => handleComponentChange(index, e)} />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Module Duration:</label>
                <input type="number" name="componentDuration" className="component-input" onChange={(e) => handleComponentChange(index, e)} />
              </div>
            </div>
            <button type="button" onClick={() => addChapter(index)}>Add Chapter</button>
            <button type="button" onClick={() => removeComponent(index)}>Remove Module</button>
            {component.chapterRequestDto.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="chapter-block">
                <h4>Chapter {chapterIndex + 1}</h4>
                <div className="form-row">
                  <div>
                    <label>Chapter Name:</label>
                    <input type="text" name="chapterName" className="chapter-input" onChange={(e) => handleChapterChange(index, chapterIndex, e)} />
                  </div>
                  <div>
                    <label>Chapter Code:</label>
                    <input type="text" name="chapterCode" className="chapter-input" onChange={(e) => handleChapterChange(index, chapterIndex, e)} />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>Chapter Description:</label>
                    <input type="text" name="chapterDescription" className="chapter-input" onChange={(e) => handleChapterChange(index, chapterIndex, e)} />
                  </div>
                  <div>
                    <label>Chapter Duration:</label>
                    <input type="number" name="chapterDuration" className="chapter-input" onChange={(e) => handleChapterChange(index, chapterIndex, e)} />
                  </div>
                </div>
                <button type="button" onClick={() => removeChapter(index, chapterIndex)}>Remove Chapter</button>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Save Course</button>
      </form>
    </div>
  );
};

export default Addcourse;