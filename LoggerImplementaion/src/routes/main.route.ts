
import testRouter from "./test.route.ts";

import express from 'express';

const mainRouter = express.Router();

    
mainRouter.use('/test',testRouter);


export default mainRouter