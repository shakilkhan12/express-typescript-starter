

import { VideoController } from "@/controllers";
import { Router } from "express";
const router  = Router();
router.get('/download', VideoController.downloadVideo)
router.get('/video-details', VideoController.videoDetails)

export { router as videoRouter}