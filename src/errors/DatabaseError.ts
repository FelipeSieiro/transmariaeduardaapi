export class DatabaseError extends Error {

    statusCode:number;
    code?:string;


    constructor(
        message:string,
        code?:string
    ){

        super(message);

        this.name = "DatabaseError";

        this.statusCode = 400;

        this.code = code;

    }

}