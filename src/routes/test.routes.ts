import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

const router = Router();


router.get(
    "/privado",
    authenticate,
    (req, res) => {

        return res.json({

            success:true,

            message:"Você acessou uma rota protegida",

            usuario:req.user

        });

    }
);


export default router;