import Task from "../db/TaskSchema.js";
import { socketIo } from "../index.js";
import schedule from "node-schedule";
export const addTask = async (req, res) => {
  try {
    const { time, taskId, title, description,date} = req.body;
console.log(time,title,description,date)
  
    const newTask = new Task({
      taskId,
      title,
      description,
      time,
      date
    
    });

   
   
   await newTask.save()
   const dates = new Date();
   dates.setSeconds(dates.getSeconds() + 10);
   
   schedule.scheduleJob(dates, function () {
     socketIo.emit("taskAdded", {
       message: "A new task has been added successfully!",
     });
   
     console.log("Task Added event emitted!");
   });
  // setTimeout(() => {
  //   socketIo.emit("taskAdded", {
  //     message: "A new task has been added successfully!",
  //   });
  // }, 1000);

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
