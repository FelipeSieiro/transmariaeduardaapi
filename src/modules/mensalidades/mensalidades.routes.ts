import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { MensalidadesController } from "./mensalidades.controller.js";
import { authenticate } from "../../middlewares/auth.js";

const router = Router();
const controller = new MensalidadesController();

// =====================================================
// 1. ROTAS ESPECÍFICAS DE AÇÃO E BUSCA (Devem vir primeiro)
// =====================================================
router.post("/gerar", authenticate, authorize("ADMIN"), controller.gerar);
router.get("/contrato/:contratoId", authenticate, authorize("ADMIN"), controller.findByContrato);

// =====================================================
// 2. ROTAS NA RAIZ DO MÓDULO (GET / e POST /)
// =====================================================
router.get("/", authenticate, authorize("ADMIN"), controller.findAll);
router.post("/", authenticate, authorize("ADMIN"), controller.create);

// =====================================================
// 3. ROTAS PARAMETRIZADAS POR ID (Devem vir por último)
// =====================================================
router.get("/:id", authenticate, authorize("ADMIN"), controller.findById);
router.put("/:id", authenticate, authorize("ADMIN"), controller.update);
router.patch("/:id/pagar", authenticate, authorize("ADMIN"), controller.pagar);
router.delete("/:id", authenticate, authorize("ADMIN"), controller.delete);

export { router as mensalidadesRouter };