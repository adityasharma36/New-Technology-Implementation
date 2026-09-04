
import express from 'express'
import { configServer } from './config/serverConfig.js';
import mainRouter from './routes/main.route.ts';
import { appErrorHandler } from './middlewares/error.middleware.ts';
import { consoleLogs, defaultLogs } from './config/logger.config.ts';



const app = express();


app.use(defaultLogs)
app.use(consoleLogs)
app.use(express.json());
app.use('/api/v1',mainRouter);
app.use(appErrorHandler)

app.listen(configServer.PORT,()=>{
    console.log(`Server Runnning on Port : ${configServer.PORT}`);

    
})