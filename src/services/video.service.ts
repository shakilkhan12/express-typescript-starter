
import { STATUS } from "@/typescript";
import { HttpException } from "@/utils/HttpException.utils";
import { Request, Response } from "express";
import ytdl from "ytdl-core";
import { getUser } from "@/utils/users";

class VideoService {
  protected static download = async({videoURL, socketId, itag}: {videoURL: string, socketId: string, itag: string}, req: Request, res: Response) => {
    const socket = req.app.get('io');
    const user = getUser(socketId)
    
    if (!ytdl.validateURL(videoURL)) {
      throw new HttpException(STATUS.BAD_REQUEST, "Invalid YouTube URL");
    }
    
    const info = await ytdl.getInfo(videoURL);
    const format = ytdl.chooseFormat(info.formats, { quality: itag });
    const video = ytdl(videoURL, {format});
    let starttime: any;
    video.pipe(res);
    video.once('response', () => {
      starttime = Date.now();
    });
    video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
      if(user?.socketId) {
        socket.to(user?.socketId).emit('progress', `${(percent * 100).toFixed(2)}%`)
        socket.to(user?.socketId).emit('mb', `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`)
        socket.to(user?.socketId).emit('time-left', `Estimated time left: ${estimatedDownloadTime.toFixed(2)} minutes `)
        socket.to(user?.socketId).emit('downloaded-minutes', `Running for: ${downloadedMinutes.toFixed(2)} minutes`)
      }
      // console.log(`${(percent * 100).toFixed(2)}% downloaded `);
      // console.log(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
      // console.log(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
      // console.log(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
    });
    video.on('end', () => {
      console.log('\n\n');
    })
  }
  protected static getDetails = async (videoURL: string) => {
    if (!ytdl.validateURL(videoURL)) {
      throw new HttpException(STATUS.BAD_REQUEST, "Invalid YouTube URL");
    }
    const videoInfo = await ytdl.getInfo(videoURL);
    const formats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');
    const { title, thumbnails, } = videoInfo.videoDetails;
    return {
      videoInfo,
      title,
      thumbnail: thumbnails[thumbnails.length - 1].url,
      formats
    }
  }

}
export default VideoService;