import { Router } from "express";

import { VeiculosController } from "./veiculos.controller";


const router = Router();


const controller =
  new VeiculosController();



// GET /api/veiculos

router.get(
  "/",
  controller.findAll.bind(controller),
);



// GET /api/veiculos/:id

router.get(
  "/:id",
  controller.findById.bind(controller),
);



// POST /api/veiculos

router.post(
  "/",
  controller.create.bind(controller),
);



// PUT /api/veiculos/:id

router.put(
  "/:id",
  controller.update.bind(controller),
);



// PATCH /api/veiculos/:id/status

router.patch(
  "/:id/status",
  controller.updateStatus.bind(controller),
);



// DELETE /api/veiculos/:id

router.delete(
  "/:id",
  controller.delete.bind(controller),
);



export {
  router as veiculosRouter,
};