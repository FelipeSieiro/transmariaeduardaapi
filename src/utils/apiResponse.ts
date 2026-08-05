import { Response } from "express";


export function successResponse<T>(
    res: Response,
    data: T,
    statusCode = 200
) {

    return res.status(statusCode).json({

        success: true,

        data

    });

}