import { Router } from "express";

import { AlunosController } from "./alunos.controller";



const router = Router();



const controller =
  new AlunosController();







// =====================================
// LISTAGEM
// =====================================


router.get(
  "/",
  controller.findAll,
);







// =====================================
// CADASTRO INDIVIDUAL
// Mantém funcionando
// =====================================


router.post(
  "/",
  controller.create,
);







// =====================================
// CADASTRO COMPLETO
// Aluno + Responsáveis + Contrato
// =====================================


router.post(
  "/completo",
  controller.createCompleto,
);







// =====================================
// BUSCAR POR ID
// Sempre depois das rotas fixas
// =====================================


router.get(
  "/:id",
  controller.findById,
);







// =====================================
// ATUALIZAÇÃO
// =====================================


router.put(
  "/:id",
  controller.update,
);







// =====================================
// REMOVER
// =====================================


router.delete(
  "/:id",
  controller.delete,
);







// =====================================
// ADICIONAR RESPONSÁVEL
// =====================================


router.post(
  "/:id/responsaveis",
  controller.addResponsavel,
);







export {
  router as alunosRouter,
};