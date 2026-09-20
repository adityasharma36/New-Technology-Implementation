
import dotenv from 'dotenv'


export function loadEnv(){
    dotenv.config();
}
loadEnv()
interface serverConf{
    PORT:number
    MONGO_URL:string
    JWT_SECRET:string
}

export const serverConfig:serverConf = {
    PORT:Number(process.env.PORT) || 3000,
    MONGO_URL: process.env.MONGO_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || ""
}