import { TestService } from "@/services";
import { Status } from "@/typescript";

import { NextFunction, Request, Response } from "express";

export const TestController = {
  async test(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await TestService.test();
      res.status(Status.SUCCESS).json(data)
     return;
    } catch (error: any) {
      next(error)
    }
  }
}