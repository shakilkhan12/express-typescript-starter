import { Router } from "express";
import { authRouter } from "./auth.routes";
import { videoRouter } from "./video.routes";
const mainRouter = Router();
mainRouter.use('/auth', authRouter)
mainRouter.use('/video', videoRouter)
export default mainRouter;