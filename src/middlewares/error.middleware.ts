import { HttpException } from "@/utils/HttpException.utils";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';
        res.status(status).json({ message });     
}