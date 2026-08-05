import { Router } from "express";

import { RotasController } from "./rotas.controller.js";
import { authenticate } from "../../middlewares/auth.js";
import { authorize } from "../../middlewares/authorize.js";


const router = Router();


const controller =
  new RotasController();





router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.findAll,
);



router.get(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.findById,
);





router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  controller.create,
);





router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.update,
);





router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  controller.updateStatus,
);





router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete,
);



export {
  router as rotasRouter,
};