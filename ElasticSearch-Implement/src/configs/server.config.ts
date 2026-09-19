
import dotenv from 'dotenv'
dotenv.config();

interface ServerConfig{
    PORT:number,
    ELASTICSEARCH_NODE:string
    ELASTICSEARCH_USERNAME:string,
    ELASTICSEARCH_PASSWORD:string
}

export const serverConfig:ServerConfig = {
    PORT:Number(process.env.PORT) || 3000 ,
  ELASTICSEARCH_NODE: process.env.ELASTICSEARCH_NODE|| '',
    ELASTICSEARCH_PASSWORD:process.env.ELASTICSEARCH_PASSWORD || "",
    ELASTICSEARCH_USERNAME: process.env.ELASTICSEARCH_USERNAME || ''

 }