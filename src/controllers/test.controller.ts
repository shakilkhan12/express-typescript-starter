import { TestService } from "@/services";
import { STATUS } from "@/typescript";

import { NextFunction, Request, Response } from "express";

export const TestController = {
  async test(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await TestService.test();
      res.status(STATUS.SUCCESS).json(data)
     return;
    } catch (error: any) {
      next(error)
    }
  }
}
