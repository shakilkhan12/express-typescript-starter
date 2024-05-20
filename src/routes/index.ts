import { Router } from "express";
import { testRouter } from "@routes/test.routes";
const mainRouter = Router();
mainRouter.use('/test', testRouter)
export default mainRouter;