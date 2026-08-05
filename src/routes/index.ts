import { Router } from "express";

import { healthRouter } from "./health.routes.js";

import authRoutes from "../auth/auth.routes.js";

import { escolasRouter } from "../modules/escolas/escolas.routes.js";
import { motoristasRouter } from "../modules/motoristas/motoristas.routes.js";
import { veiculosRouter } from "../modules/veiculos/veiculos.routes.js";
import { rotasRouter } from "../modules/rotas/rotas.routes.js";
import { responsaveisRouter } from "../modules/responsaveis/responsaveis.routes.js";
import { alunosRouter } from "../modules/alunos/alunos.routes.js";

import contratosRoutes from "../modules/contratos/contratos.routes.js";

import { mensalidadesRouter } from "../modules/mensalidades/mensalidades.routes.js";

import testRoutes from "./test.routes.js";


const router = Router();


router.use(
    "/health",
    healthRouter
);


router.use(
    "/auth",
    authRoutes
);


router.use(
    "/escolas",
    escolasRouter
);


router.use(
    "/motoristas",
    motoristasRouter
);


router.use(
    "/veiculos",
    veiculosRouter
);


router.use(
    "/rotas",
    rotasRouter
);


router.use(
    "/responsaveis",
    responsaveisRouter
);


router.use(
    "/alunos",
    alunosRouter
);


router.use(
    "/contratos",
    contratosRoutes
);


router.use(
    "/mensalidades",
    mensalidadesRouter
);


router.use(
    "/teste",
    testRoutes
);


export {
    router
};