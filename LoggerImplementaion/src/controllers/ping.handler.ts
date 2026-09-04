import type { NextFunction, Response,Request } from "express";
import { InternalError } from "../helpers/errors/custom.error.ts";

export async function pingHandler(req:Request,res:Response,Next:NextFunction){
    try {
  
        res.status(200).json({
            mesage:"Hello World",
      
        })

    } catch (error) {
        throw new InternalError('InternalError')
    }
}