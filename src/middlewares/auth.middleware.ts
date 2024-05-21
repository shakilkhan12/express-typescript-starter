import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { STATUS } from "@/typescript";
import { CONFIG } from "@/config";
import { AuthModel } from "@/models";
import { CustomRequest } from "@/typescript/interfaces";

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: "No token provided.",
      });
    }

    const { _id } = jwt.verify(token, CONFIG.JWT_SECRET as string) as { _id: string };

    const user = await AuthModel.findById(_id).select('-password');
  
    if (!user) {
      return res.status(STATUS.NOT_FOUND).json({
        message: "User not found",
      });
    } else {
      req.user = {
        _id: user._id as string,
        email: user.email,
      }
      next();
    }
  } catch (err) {
    res.status(STATUS.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};
