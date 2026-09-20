import type { NextFunction, Request, RequestHandler, Response } from "express";
import { Forbidden, Unauthorized } from "../utils/errors/app.error.js";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { serverConfig } from "../config/server.config.js";
import User from "../db/models/user.model.js";

const protect: RequestHandler = async (req:Request,res:Response,next:NextFunction) => {
    try {

        const authHeader = req.headers.authorization;

        console.log(authHeader);

        if(!authHeader?.startsWith("Bearer")){
            throw new Unauthorized("NO Authorized ! no token provided")
        }
        const token = authHeader.split(' ')[1];
        
        if(!token){
            throw new Unauthorized('no token Provided');
        }
        const decode = jwt.verify(token,serverConfig.JWT_SECRET) as JwtPayload;

        if(!decode.sub){
            throw new Unauthorized('Invalid token payload')
        }
        const user = await User.findById(decode.sub);

        if(!user?.isActive){
            throw new Forbidden('Account is deactivated');
        }

        req.user = user;
        next;
        
    } catch (error) {
        next(error);
    }
}