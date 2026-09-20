
export interface AppError extends Error{
    statusCode:number
}

 export class InternalError implements AppError{
    name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name = "InternalError",
        this.statusCode = 500,
        this.message = msg
    }
}
export class Unauthorized implements AppError{
     name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name="BadRequestError",
        this.statusCode= 401,
        this.message = msg;

    }
}
export class Forbidden implements AppError{
     name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name="BadRequestError",
        this.statusCode= 403,
        this.message = msg;

    }
}
export class BadRequestError implements AppError{
    name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name="BadRequestError",
        this.statusCode= 400,
        this.message = msg;

    }
}

export class NotFoundError implements AppError{
    name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name= "NotFoundError",
        this.statusCode=404;
        this.message= msg
    }
}

export class NotImplementError implements AppError{
    name:string
    message: string
    statusCode: number
    constructor(msg:string){
        this.name = "NotImplementError",
        this.statusCode = 501,
        this.message = msg;
    }
}