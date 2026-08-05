import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError.js";


export function authorize(
    ...roles: ("ADMIN" | "USER")[]
){

    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {


        if(!req.user){

            throw new AppError(
                "Usuário não autenticado",
                401
            );

        }



        if(!roles.includes(req.user.role)){

            throw new AppError(
                "Usuário sem permissão",
                403
            );

        }



        next();

    };

}