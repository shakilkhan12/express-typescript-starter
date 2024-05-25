import LoginService from "@/services/auth.service";
import { STATUS, IUser } from "@/typescript";
import { NextFunction, Request, Response } from "express";

class AuthController extends LoginService {
    public static userRegister = async (req: Request<{}, {}, IUser>, res:Response, next: NextFunction) => {
        try {
        const user = await LoginService.register(req.body);
        res.status(STATUS.CREATED).json(user);
        } catch (error) {
            next(error)
        }
    }
    public static userLogin = async (req: Request, res:Response, next: NextFunction) => {
        try {
        const user = await LoginService.login(req.body);
        res.status(STATUS.SUCCESS).json(user);
        } catch (error) {
            next(error)
        }
    }
}
export { AuthController }