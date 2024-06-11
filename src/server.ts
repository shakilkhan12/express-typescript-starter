
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import { Server } from "socket.io";
import http from "http"
import express, { Request, Response } from "express";
import mainRouter from "@/routes";
import { errorHandler } from "@/middlewares";
import { addUser, users } from "./utils/users";


const app = express();
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true
  }
});
app.use(cors({ credentials: true, origin: process.env.CLIENT }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// routess
app.get("/", (_req: Request, res: Response) => res.send("🚀 Welcome to the API"));
app.use('/api', mainRouter)
app.use(errorHandler)
io.on('connection', (socket) => {
  console.log('connected -> ', socket.id)
  app.set('socket', socket)
  app.set('io', io)
  addUser(socket.id)
  console.log('users -> ', users)
})
const startServer = async () => {
  try {
    // await dbConnection()
    server.listen(PORT, () => {
      console.log(`🚀  Server ready at: http://localhost:${PORT}/`);
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
