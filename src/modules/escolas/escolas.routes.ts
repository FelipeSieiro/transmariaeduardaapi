import { Router } from "express";

import { EscolasController } from "./escolas.controller";


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
  controller.create.bind(controller),
);



// PUT /api/escolas/:id

router.put(
  "/:id",
  controller.update.bind(controller),
);



// DELETE /api/escolas/:id

router.delete(
  "/:id",
  controller.delete.bind(controller),
);


export { router as escolasRouter };