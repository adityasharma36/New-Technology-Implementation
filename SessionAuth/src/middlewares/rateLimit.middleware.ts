
import rateLimit, { type Options } from "express-rate-limit";

 const rateLimitOption : Partial<Options> = {
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:true,
    legacyHeaders:false,
    ipv6Subnet:56,
    message:{
        success:false,
        message: "Too many login attempts. Try again in 10 minutes.",
    }
}

export const loginLimiter = rateLimit(rateLimitOption);