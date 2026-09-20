import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../utils/errors/app.error.js";


export const GenericErrorMiddleware = (err:AppError,req:Request,res:Response,next:NextFunction) => {
        res.status(err.statusCode).json({
            sucsess:false,
            message:err.message
        })
}