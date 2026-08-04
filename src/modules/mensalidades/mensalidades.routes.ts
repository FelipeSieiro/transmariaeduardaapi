import { Router } from "express";
import { MensalidadesController } from "./mensalidades.controller";

const router = Router();
const controller = new MensalidadesController();

// =====================================================
// 1. ROTAS ESPECÍFICAS DE AÇÃO E BUSCA (Devem vir primeiro)
// =====================================================
router.post("/gerar", controller.gerar);
router.get("/contrato/:contratoId", controller.findByContrato);

// =====================================================
// 2. ROTAS NA RAIZ DO MÓDULO (GET / e POST /)
// =====================================================
router.get("/", controller.findAll);
router.post("/", controller.create);

// =====================================================
// 3. ROTAS PARAMETRIZADAS POR ID (Devem vir por último)
// =====================================================
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.patch("/:id/pagar", controller.pagar);
router.delete("/:id", controller.delete);

export { router as mensalidadesRouter };