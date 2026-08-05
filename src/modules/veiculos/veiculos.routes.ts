import { Router } from "express";

import { VeiculosController } from "./veiculos.controller.js";
import { authenticate } from "../../middlewares/auth.js";
import { authorize } from "../../middlewares/authorize.js";


const router = Router();


const controller =
  new VeiculosController();



// GET /api/veiculos

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.findAll.bind(controller),
);



// GET /api/veiculos/:id

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.findById.bind(controller),
);



// POST /api/veiculos

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create.bind(controller),
);



// PUT /api/veiculos/:id

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update.bind(controller),
);



// PATCH /api/veiculos/:id/status

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  controller.updateStatus.bind(controller),
);



// DELETE /api/veiculos/:id

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete.bind(controller),
);



export {
  router as veiculosRouter,
};