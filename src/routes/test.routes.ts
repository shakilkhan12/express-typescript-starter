
import { TestController } from "@/controllers";
import { Router } from "express";
const testRouter  = Router();
testRouter.get('/test-route', TestController.test)
export { testRouter}