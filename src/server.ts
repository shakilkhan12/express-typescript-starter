
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import express, { Request, Response } from "express";
import mainRouter from "@/routes";
import { errorHandler } from "@/middlewares";
import { dbConnection } from "@/database/connection";

const app = express();
const PORT = 5000;

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
const startServer = async () => {
  try {
    await dbConnection()
    app.listen(PORT, () => {
      console.log(`🚀  Server ready at: http://localhost:${PORT}/`);
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
