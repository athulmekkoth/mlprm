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
    type: Date,
    required: true,
  },
  subTasks: [SubTaskSchema], 
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
