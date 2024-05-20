import dotenv from "dotenv"
dotenv.config();
interface ConfigTypes {
    DB?: string,
    NODE_ENV?:string
}
export const CONFIG: ConfigTypes = {
    DB: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
}