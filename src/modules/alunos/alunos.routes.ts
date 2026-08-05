import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { AlunosController } from "./alunos.controller.js";

const router = Router();
const controller = new AlunosController();

// =====================================
// LISTAGEM & CADASTROS
// =====================================

router.get(
  "/",
  controller.findAll,
);

router.post(
  "/",
  authorize("ADMIN"),

  controller.create,
);

router.post(
  "/completo",
  controller.createCompleto,
);

// =====================================
// SUB-ROTAS ESPECÍFICAS DE ALUNO
// (Devem vir SEMPRE ANTES de /:id)
// =====================================

// Responsáveis
router.post(
  "/:id/responsaveis",
  controller.addResponsavel,
);

// Agendamento de Rotas Semanais
router.get(
  "/:id/agendamentos-rotas",
  controller.getAgendamentosRotas,
);

router.put(
  "/:id/agendamentos-rotas",
  controller.syncAgendamentosRotas,
);

// =====================================
// OPERAÇÕES POR ID (CRUD BÁSICO)
// =====================================

router.get(
  "/:id",
  controller.findById,
);

router.put(
  "/:id",
  controller.update,
);

router.delete(
  "/:id",
  controller.delete,
);

export { router as alunosRouter };