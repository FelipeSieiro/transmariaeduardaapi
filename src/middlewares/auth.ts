import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";



export function authenticate(
    req: Request,
    _res: Response,
    next: NextFunction
) {


    const authHeader =
        req.headers.authorization;



    if(!authHeader){

        throw new AppError(
            "Token não informado",
            401
        );

    }



    const [, token] =
        authHeader.split(" ");




    if(!token){

        throw new AppError(
            "Token inválido",
            401
        );

    }




    try {


        const decoded =
            verifyToken(token);



        req.user = decoded;



        next();



    } catch(error){


        throw new AppError(
            "Token inválido ou expirado",
            401
        );


    }


}