import { Router } from "express";

import { MotoristasController } from "./motoristas.controller.js";
import { authenticate } from "../../middlewares/auth.js";
import { authorize } from "../../middlewares/authorize.js";


const router = Router();

const controller =
  new MotoristasController();



// GET /api/motoristas

router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.findAll.bind(controller),
);



// GET /api/motoristas/:id

router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.findById.bind(controller),
);



// POST /api/motoristas

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create.bind(controller),
);



// PUT /api/motoristas/:id

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update.bind(controller),
);



// DELETE /api/motoristas/:id

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete.bind(controller),
);



// PATCH /api/motoristas/:id/status

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  controller.updateStatus.bind(controller),
);



export {
  router as motoristasRouter,
};