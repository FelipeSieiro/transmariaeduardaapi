import { Request, Response } from "express";

import { AuthService } from "./auth.service";

import { successResponse } from "../utils/apiResponse";



export class AuthController {


    private authService: AuthService;



    constructor(){

        this.authService =
            new AuthService();

    }





    async register(
        req: Request,
        res: Response
    ){


        const user =
            await this.authService.register(
                req.body
            );



        return successResponse(
            res,
            user,
            201
        );


    }







    async login(
        req: Request,
        res: Response
    ){


        const user =
            await this.authService.login(
                req.body
            );



        return successResponse(
            res,
            user
        );


    }







    async me(
        req: Request,
        res: Response
    ){


        const user =
            await this.authService.findProfile(
                req.user.id
            );



        return successResponse(
            res,
            user
        );


    }



}