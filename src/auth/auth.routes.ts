import { Router } from "express";
import { authenticate } from "../middlewares/auth";

import { AuthController } from "./auth.controller";

import { validate } from "../middlewares/validate";

import {
    createUserSchema,
    loginSchema
} from "./auth.schema";

import { asyncHandler } from "../middlewares/asyncHandler";


const router = Router();


const authController =
    new AuthController();



router.post(
    "/register",
    validate(createUserSchema),
    asyncHandler((req, res) => authController.register(req, res))
);

router.post(
    "/login",
    validate(loginSchema),
    asyncHandler((req, res) => authController.login(req, res))
);

router.get(
    "/me",
    authenticate,
    asyncHandler((req, res) => authController.me(req, res))
);




export default router;