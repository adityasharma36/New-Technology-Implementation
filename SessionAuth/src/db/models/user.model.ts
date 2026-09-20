import bcrypt from "bcryptjs"
import mongoose, { Schema, type Document, type Model, type Types } from "mongoose"

export interface IUser{
    name:string,
    email:string,
    password:string,
    tokenVersion:number,
    isVerified:boolean,
    isActive:boolean,
    passwordChangeAt?:Date,
    passwordResetToken?:string,
    passwordResetExpire?:Date,
    emailVerificationToken?:string,
    emailVerficationExpire?:Date,
    lastLogin?:Date
    createdAt:Date,
    updatedAt:Date

}

export interface IUserMethod{
    comparePassword(candidatePassword:string): Promise<boolean>
}

export interface IUserDocument extends IUser,IUserMethod, Document {
    _id:Types.ObjectId
}


export type UserModel = Model<IUserDocument,{},IUserMethod>;



const userSchema = new Schema<IUserDocument,IUserMethod,UserModel>({
    name:{
        type:String,
        trim:true,
        required:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select:false
    },
    tokenVersion:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    passwordChangeAt:Date,
    passwordResetExpire:Date,
    passwordResetToken:String,
    emailVerficationExpire:Date,
    emailVerificationToken:String,
    lastLogin:Date,

},{
    timestamps:true
})





// password hashing middleware 

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,12);
})


// Instance Method
userSchema.methods.comparePassword = async function (candidatePassword:string) : Promise<boolean> {
    return bcrypt.compare(candidatePassword,this.password);
}


// to json  TransForm
userSchema.set("toJSON",{
    transform:(_doc,ret) => {
        const obj = ret as unknown as Record<string,unknown>;
        delete obj.password;
        delete obj.tokenVersion;
        delete obj.passwordResetToken;
        delete obj.passwordResetExpire;
        delete obj.emailVerficationExpire;
        delete obj.emailVerificationToken;
        delete obj.__v;

        obj.id = obj._id;
        delete obj._id;

        return obj;

    }
})

const User = mongoose.model<IUserDocument,UserModel>("User",userSchema);

export default User;