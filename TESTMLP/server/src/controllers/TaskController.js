import Task from "../db/TaskSchema.js";
import { socketIo } from "../index.js";


export const addTask = async (req, res) => {
  try {
    const { time, taskId, title, description,date} = req.body;
console.log(time,title,description,date)
    // Create a new task
    const newTask = new Task({
      taskId,
      title,
      description,
      time,
      date
    
    });

   
    await newTask.save();
    socketIo.emit("taskAdded", {
      message: "A new task has been added successfully!",

    });

    res.status(201).json({
      success: true,
      message: 'Task added successfully',
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

  
    const task = await Task.find();

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
