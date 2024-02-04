import express from "express"
import { getUserSessions, loginUserController, logoutUserController, registerUserController, verifyUserController } from "../controllers/auth.controllers"
import { validateResource } from "../middlewares/validateResource"
import { UserRegistrationInputSchema } from "../schemas/user.schema"
import { UserSessionSchema } from "../schemas/session.schema"
import { authenticateUser } from "../middlewares/authenticateUser"
let router=express.Router()


router.post("/register",validateResource(UserRegistrationInputSchema),registerUserController)
router.post("/login",validateResource(UserSessionSchema),loginUserController)
router.get("/home",authenticateUser,getUserSessions)
router.get("/verifyUser",authenticateUser,verifyUserController)
router.post("/logout",authenticateUser,logoutUserController)
export default router



