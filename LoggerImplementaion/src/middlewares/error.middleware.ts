import type { NextFunction, Request, Response } from "express";
import type { AppError } from "../helpers/errors/custom.error.ts";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};