import { TaskController } from "../controllers/task_controller";
import * as express from "express";

const taskController = new TaskController();

const router =  express.Router();

router.post('/tasks', taskController.CreateTask);

router.get('/tasks', taskController.GetTasks);
router.get('/tasks/:id', taskController.GetOneTask);
router.get('/tasks/id', taskController.GetTasksByGroupId);

router.put('/tasks/:id', taskController.UpdateTask);

router.delete('/tasks/:id', taskController.DeleteTask);

export {
    router as TaskRouter
}