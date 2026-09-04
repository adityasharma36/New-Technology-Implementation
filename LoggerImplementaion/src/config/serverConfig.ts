
import dotenv from 'dotenv';

function loadConfig(){
    dotenv.config();
}

loadConfig();

type serverConfig ={
    PORT:number
}

export const configServer:serverConfig = {
    PORT: Number(process.env.PORT) || 3000
}