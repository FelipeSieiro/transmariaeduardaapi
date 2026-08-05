import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { MensalidadesController } from "./mensalidades.controller.js";

const router = Router();
const controller = new MensalidadesController();

// =====================================================
// 1. ROTAS ESPECÍFICAS DE AÇÃO E BUSCA (Devem vir primeiro)
// =====================================================
router.post("/gerar", authorize("ADMIN"), controller.gerar);
router.get("/contrato/:contratoId", authorize("ADMIN"), controller.findByContrato);

// =====================================================
// 2. ROTAS NA RAIZ DO MÓDULO (GET / e POST /)
// =====================================================
router.get("/", authorize("ADMIN"), controller.findAll);
router.post("/", authorize("ADMIN"), controller.create);

// =====================================================
// 3. ROTAS PARAMETRIZADAS POR ID (Devem vir por último)
// =====================================================
router.get("/:id", authorize("ADMIN"), controller.findById);
router.put("/:id", authorize("ADMIN"), controller.update);
router.patch("/:id/pagar", authorize("ADMIN"), controller.pagar);
router.delete("/:id", authorize("ADMIN"), controller.delete);

export { router as mensalidadesRouter };