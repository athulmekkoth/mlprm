import Task from "../db/TaskSchema";


export const addTask = async (req, res) => {
  try {
    const { taskId, title, description, time, subTasks } = req.body;

    // Create a new task
    const newTask = new Task({
      taskId,
      title,
      description,
      time,
      subTasks: subTasks || [], 
    });

   
    await newTask.save();

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

    // Find task by taskId
    const task = await Task.findOne({ taskId });

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
