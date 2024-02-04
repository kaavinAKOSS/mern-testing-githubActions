import express from "express"
import { authenticateUser } from "../middlewares/authenticateUser"
import { createTaskController, deleteTaskById, getAllTasksByUserController, getTaskByIdController } from "../controllers/task.controllers"
import { validateResource } from "../middlewares/validateResource"
import { CreateTaskInputSchema, GetTaskByIdSchema } from "../schemas/task.schema"

let router=express.Router()

router.post("/task",validateResource(CreateTaskInputSchema),authenticateUser,createTaskController)
router.get("/task",authenticateUser,getAllTasksByUserController)
router.get("/task/:taskId",validateResource(GetTaskByIdSchema),authenticateUser,getTaskByIdController)
router.delete("/task/:taskId",validateResource(GetTaskByIdSchema),authenticateUser,deleteTaskById)
export default router