import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { authenticate } from "../../middlewares/auth.js";
import { EscolasController } from "./escolas.controller.js";


const router = Router();

const controller = new EscolasController();



// GET /api/escolas

router.get(
  "/",
  controller.findAll.bind(controller),
);



// GET /api/escolas/:id

router.get(
  "/:id",
  controller.findById.bind(controller),
);



// POST /api/escolas

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create.bind(controller),
);



// PUT /api/escolas/:id

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update.bind(controller),
);



// DELETE /api/escolas/:id

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete.bind(controller),
);


export { router as escolasRouter };