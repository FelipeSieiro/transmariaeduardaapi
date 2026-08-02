import { Router } from "express";

import { healthRouter } from "./health.routes";

import { escolasRouter } from "../modules/escolas/escolas.routes";

import { motoristasRouter } from "../modules/motoristas/motoristas.routes";


const router = Router();



router.use(
  "/health",
  healthRouter,
);



router.use(
  "/escolas",
  escolasRouter,
);



router.use(
  "/motoristas",
  motoristasRouter,
);



export { router };