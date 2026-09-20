import mongoose, { Schema, type Model, type Types } from "mongoose";
import crypto from "node:crypto";

export interface ISession{
    user:Types.ObjectId,
    refreshTokenHash:string,
    userAgent?:string,
    ip?:string,
    expiresAt:Date,
    createdAt:Date,
    updatedAt:Date,
}

export interface IsessionMethod{
    setRefreshToken(refreshToken:string) : void;
    compareRefreshToken(refreshToken:string) : boolean
}

export interface ISessionDocument extends ISession, IsessionMethod,Document{
    _id:Types.ObjectId
}

export type SessionModel = Model<ISessionDocument,{},IsessionMethod>;


const sessionSchema = new Schema<ISessionDocument,ISession,SessionModel>({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    refreshTokenHash:{
        type:String,
        required:true,
    },
    userAgent:String,
    ip:String,
    expiresAt:{
        type:Date,
        required:true,
    }
},{
    timestamps:true
})


// -------------------- Instant Method -------------------------
sessionSchema.methods.setRefreshToken = function (refreshToken:string) : void{
    const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.scryptSync(refreshToken,salt,64).toString('hex');

    this.refreshTokenHash = `${salt}:${hash}`
}

sessionSchema.methods.compareRefreshToken = function(refreshToken:string) : boolean {
    const [salt,storeHash]= this.refreshTokenHash.split(':');
    const currentHash = crypto.scryptSync(refreshToken,salt,64).toString('hex');
    const bufferA = Buffer.from(storeHash,'hex');
    const bufferB = Buffer.from(currentHash,'hex');

    return crypto.timingSafeEqual(bufferA,bufferB);
}

const session = mongoose.model<ISessionDocument,SessionModel>("Session",sessionSchema);


export default session