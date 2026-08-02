import { Router } from "express";

import { healthRouter } from "./health.routes";
import { escolasRouter } from "../modules/escolas/escolas.routes";


const router = Router();


router.use(
    "/health",
    healthRouter,
);


router.use(
    "/escolas",
    escolasRouter,
);


export { router };