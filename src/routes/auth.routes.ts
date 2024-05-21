


import { authController } from "@/controllers";
import { Router } from "express";
const authRouter  = Router();
authRouter.post('/register', authController.userRegister)
authRouter.post('/login', authController.userLogin)
export { authRouter}