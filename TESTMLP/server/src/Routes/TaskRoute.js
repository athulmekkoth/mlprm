import express from "express"
import { addTask, getTask } from "../controllers/TaskController"
const TaskRouter = express.Router()


TaskRouter.post("/AddTask",addTask)
TaskRouter.get("/GeTask",getTask)