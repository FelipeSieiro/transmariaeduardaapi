import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";

import { AuthController } from "./auth.controller.js";

import { validate } from "../middlewares/validate.js";

import {
    createUserSchema,
    loginSchema
} from "./auth.schema.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";


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