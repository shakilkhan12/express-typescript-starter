import LoginService from "@/services/auth.service";
import { STATUS } from "@/typescript";
import { IUser } from "@/typescript/interfaces";
import { NextFunction, Request, Response } from "express";

class AuthController extends LoginService {
    public userRegister = async (req: Request<{}, {}, IUser>, res:Response, next: NextFunction) => {
        try {
        const user = await this.register<IUser>(req.body);
        res.status(STATUS.CREATED).json(user);
        } catch (error) {
            next(error)
        }
    }
    public userLogin = async (req: Request, res:Response, next: NextFunction) => {
        try {
        const user = await this.login(req.body);
        res.status(STATUS.SUCCESS).json(user);
        } catch (error) {
            next(error)
        }
    }
}
const authController = new AuthController();
export {authController}