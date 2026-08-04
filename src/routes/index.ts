import { Router } from "express";

import { healthRouter } from "./health.routes";
import { escolasRouter } from "../modules/escolas/escolas.routes";
import { motoristasRouter } from "../modules/motoristas/motoristas.routes";
import { veiculosRouter } from "../modules/veiculos/veiculos.routes";
import { rotasRouter } from "../modules/rotas/rotas.routes";
import { responsaveisRouter } from "../modules/responsaveis/responsaveis.routes";
import { alunosRouter } from "../modules/alunos/alunos.routes";
import contratosRoutes from "../modules/contratos/contratos.routes";

// 1. IMPORTAR O MENSALIDADES ROUTER
import { mensalidadesRouter } from "../modules/mensalidades/mensalidades.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/escolas", escolasRouter);
router.use("/motoristas", motoristasRouter);
router.use("/veiculos", veiculosRouter);
router.use("/rotas", rotasRouter);
router.use("/responsaveis", responsaveisRouter);
router.use("/alunos", alunosRouter);
router.use("/contratos", contratosRoutes);

// 2. REGISTRAR A ROTA DE MENSALIDADES
router.use("/mensalidades", mensalidadesRouter);

export { router };