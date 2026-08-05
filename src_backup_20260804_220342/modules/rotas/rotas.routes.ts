import { Router } from "express";

import { RotasController } from "./rotas.controller";


const router = Router();


const controller =
  new RotasController();





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





router.patch(
  "/:id/status",
  controller.updateStatus,
);





router.delete(
  "/:id",
  controller.delete,
);



export {
  router as rotasRouter,
};