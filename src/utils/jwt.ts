import jwt from "jsonwebtoken";
import { JwtPayload } from "../auth/auth.types.js";




const JWT_SECRET =
    process.env.JWT_SECRET as string;


const JWT_EXPIRES_IN =
    process.env.JWT_EXPIRES_IN || "5h";



export function generateToken(
    payload: JwtPayload
): string {


    return jwt.sign(
        payload as object,
        JWT_SECRET as string,
        {
            expiresIn: JWT_EXPIRES_IN as any
        } as any
    );

}




export function verifyToken(
    token:string
): JwtPayload {


    return jwt.verify(
        token,
        JWT_SECRET
    ) as JwtPayload;

}