import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { AlunosController } from "./alunos.controller.js";
import { authenticate } from "../../middlewares/auth.js";

const router = Router();
const controller = new AlunosController();

// =====================================
// LISTAGEM & CADASTROS
// =====================================

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.findAll,
);

router.post(
  "/",
  authorize("ADMIN"),

  controller.create,
);

router.post(
  "/completo",
  authenticate,
  authorize("ADMIN"),
  controller.createCompleto,
);

// =====================================
// SUB-ROTAS ESPECÍFICAS DE ALUNO
// (Devem vir SEMPRE ANTES de /:id)
// =====================================

// Responsáveis
router.post(
  "/:id/responsaveis",
  authenticate,
  authorize("ADMIN"),
  controller.addResponsavel,
);

// Agendamento de Rotas Semanais
router.get(
  "/:id/agendamentos-rotas",
  authenticate,
  authorize("ADMIN"),
  controller.getAgendamentosRotas,
);

router.put(
  "/:id/agendamentos-rotas",
  authenticate,
  authorize("ADMIN"),
  controller.syncAgendamentosRotas,
);

// =====================================
// OPERAÇÕES POR ID (CRUD BÁSICO)
// =====================================

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.findById,
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete,
);

export { router as alunosRouter };