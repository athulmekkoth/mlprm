import React, { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ taskId, onClose }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subTasks, setSubTasks] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleSubTasksChange = (e) => setSubTasks(e.target.value);

  const validateForm = () => {
    if (!title || !description || !date || !time) {
      setError('Title, description, date, and time are required!');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // if (!validateForm()) {
    //   return;
    // }

    try {
      


      const newTask = {
        taskId,
        title,
        description,
        time: time,
        
        date:date
      };

      const response = await axios.post('http://localhost:8000/task/addtask', newTask);
      onClose();
  
      if (response.status === 200) {
        console.log('Task added successfully:', response.data);
        
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setError('An error occurred while adding the task. Please try again.');
    }
  };

  return (
    <div className="task-modal">
      <div className="modal-content">
        <h3>Add New Task</h3>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Task Title */}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={handleTitleChange}
          className="modal-input"
        />

        {/* Task Description */}
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={handleDescriptionChange}
          className="modal-textarea"
        />

        {/* Task Date */}
        <div className="datetime-picker">
          <label>Task Date</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="modal-input"
          />
        </div>

        {/* Task Time */}
        <div className="datetime-picker">
          <label>Task Time</label>
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="modal-input"
          />
        </div>

        {/* Subtasks */}
        {/* Uncomment if needed */}
        {/* <input
          type="text"
          placeholder="Subtasks (comma separated)"
          value={subTasks}
          onChange={handleSubTasksChange}
          className="modal-input"
        /> */}

        {/* Buttons for submitting or closing the modal */}
        <div className="modal-actions">
          <button className="submit-button" onClick={handleSubmit}>
            Add Task
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
