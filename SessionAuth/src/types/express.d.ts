import type { IUserDocument } from "../db/models/user.model.ts";

declare global{
    namespace Express{
        interface Request {
            user?:IUserDocument
        }
    }
}