import { Router } from "express";

import { ResponsaveisController } from "./responsaveis.controller.js";
import { authenticate } from "../../middlewares/auth.js";
import { authorize } from "../../middlewares/authorize.js";


const router = Router();


const controller =
  new ResponsaveisController();





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





router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  controller.delete,
);





export {
  router as responsaveisRouter,
};