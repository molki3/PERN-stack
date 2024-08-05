import { Router } from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks.controllers.js";


const taskRouter = Router();

taskRouter.get('/tasks', getTasks);

taskRouter.get('/task/:id', getTask);

taskRouter.post('/tasks', createTask);

taskRouter.delete('/tasks/:id', deleteTask);

taskRouter.put('/tasks/:id', updateTask);

export default taskRouter;