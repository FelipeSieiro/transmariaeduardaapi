import { Router } from "express";

import { MotoristasController } from "./motoristas.controller";


const router = Router();

const controller =
  new MotoristasController();



// GET /api/motoristas

router.get(
  "/",
  controller.findAll.bind(controller),
);



// GET /api/motoristas/:id

router.get(
  "/:id",
  controller.findById.bind(controller),
);



// POST /api/motoristas

router.post(
  "/",
  controller.create.bind(controller),
);



// PUT /api/motoristas/:id

router.put(
  "/:id",
  controller.update.bind(controller),
);



// DELETE /api/motoristas/:id

router.delete(
  "/:id",
  controller.delete.bind(controller),
);



// PATCH /api/motoristas/:id/status

router.patch(
  "/:id/status",
  controller.updateStatus.bind(controller),
);



export {
  router as motoristasRouter,
};