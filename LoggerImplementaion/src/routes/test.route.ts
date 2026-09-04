
import express, { type Request, type Response } from 'express'
import { pingHandler } from '../controllers/ping.handler.ts';
import { bodyValidator } from '../validations/body.validator.ts';
import { pingSchema } from '../validations/ping.validator.ts';



const testRouter = express.Router();

testRouter.post('/',bodyValidator(pingSchema),pingHandler);

export default testRouter