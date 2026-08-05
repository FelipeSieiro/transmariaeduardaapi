import { Router } from "express";

import { ResponsaveisController } from "./responsaveis.controller.js";


const router = Router();


const controller =
  new ResponsaveisController();





router.get(
  "/",
  controller.findAll,
);





router.get(
  "/:id",
  controller.findById,
);





router.post(
  "/",
  controller.create,
);





router.put(
  "/:id",
  controller.update,
);





router.delete(
  "/:id",
  controller.delete,
);





export {
  router as responsaveisRouter,
};