import { Request } from "express";
import mongoose from "mongoose";
export interface IUser {
    name: string;
    email: string;
    password: string;
  }
export interface CustomRequest extends Request {
  user?: {
    _id: string;
    email: string;
  }
}
