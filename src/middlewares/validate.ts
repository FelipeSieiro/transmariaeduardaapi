import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";


export function validate(schema: ZodTypeAny){

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            req.body = schema.parse(req.body);

            next();


        } catch(error){

            return res.status(400).json({

                message:"Dados inválidos",

                error

            });

        }

    };

}