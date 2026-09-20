

import express from 'express'
import { connectToDb } from './config/mongo.config.js';
import {  loadEnv, serverConfig } from './config/server.config.js';
import { GenericErrorMiddleware } from './middlewares/error.middleware.js';


const app = express();


app.use(express.json({
    limit:'10mb'
}))
app.use(GenericErrorMiddleware)
app.listen(serverConfig.PORT,()=>{
   
    connectToDb();
})