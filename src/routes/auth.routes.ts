
import { AuthController } from "@/controllers";
import { Router } from "express";
const authRouter  = Router();
authRouter.post('/register', AuthController.userRegister)
authRouter.post('/login', AuthController.userLogin)
export { authRouter}