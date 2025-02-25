import mongoose from 'mongoose';


const SubTaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});


const TaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
  // subTasks: [SubTaskSchema], 
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
