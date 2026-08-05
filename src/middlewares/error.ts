import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { DatabaseError } from "../errors/DatabaseError";


export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
){

    console.error(error);


    if(error instanceof AppError){

        return res.status(error.statusCode)
            .json({
                success:false,
                message:error.message
            });

    }


    if(error instanceof DatabaseError){


        if(error.code === "23505"){

            return res.status(409).json({

                success:false,

                message:
                "Registro já cadastrado"

            });

        }


        return res.status(400).json({

            success:false,

            message:
            "Erro ao acessar banco de dados"

        });

    }



    return res.status(500).json({

        success:false,

        message:
        "Erro interno do servidor"

    });

}