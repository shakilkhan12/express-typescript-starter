import VideoService from "@/services/video.service";
import { NextFunction, Request, Response } from "express";

class VideoController extends VideoService {
    public static downloadVideo = async (req: Request, res:Response, next: NextFunction) => {
      const videoURL = req.query.url as string;
      const socketId = req.query.socket as string;
      const itag = req.query.itag as string;
     try {
        await VideoService.download({videoURL, socketId, itag}, req, res)
     } catch (error: any) {
      console.log(error.message)
        next(error)
     }
    }
    public static videoDetails = async (req: Request, res:Response, next: NextFunction) => {
      const videoURL = req.query.url as string;
     try {
      const details = await VideoService.getDetails(videoURL);
      return res.status(200).json(details)
   } catch (error) {
    next(error)
   }
    }
   
}
export { VideoController }