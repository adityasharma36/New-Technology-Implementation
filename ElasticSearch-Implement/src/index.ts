
import express from 'express'
import { serverConfig } from './configs/server.config';
import { esClientConnection } from './configs/elastic.config';
import eRoute from './routes/eSearch.route';

const app = express();

app.use(express.json());
app.use('/api/v1',eRoute)
app.listen(serverConfig.PORT,()=>{
    console.log('server connected')
    esClientConnection();
})
