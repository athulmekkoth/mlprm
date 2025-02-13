import express from "express"
import { addTask, getTask } from "../controllers/TaskController.js"
const TaskRouter = express.Router()


TaskRouter.post("/addTask",addTask)
TaskRouter.get("/getTask",getTask)

export default TaskRouter