import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TaskList = () => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchTasks = async () => {  
      try {
        const response = await axios.get('http://localhost:8000/task/getTask');  
        setTasks(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks');  
        setLoading(false);  
      }
    };

    fetchTasks(); 
  }, []); 

  if (loading) {
    return <div className="loading">Loading...</div>;  
  }

  if (error) {
    return <div className="error">{error}</div>;  
  }

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      {tasks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.taskId}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.time}</td>
                <td>{task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available.</p>  
      )}
    </div>
  );
};

export default TaskList;
