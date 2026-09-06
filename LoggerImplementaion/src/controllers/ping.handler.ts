import type { NextFunction, Response,Request } from "express";
import { InternalError } from "../utils/errors/custom.error.ts";
import { logger } from "../config/winston.logger.config.ts";

export async function pingHandler(req:Request,res:Response,Next:NextFunction){
    try {
        logger.info('hello World this is mesage')
        res.status(200).json({
            mesage:"Hello World",
      
        })

    } catch (error) {
        throw new InternalError('InternalError')
    }
}