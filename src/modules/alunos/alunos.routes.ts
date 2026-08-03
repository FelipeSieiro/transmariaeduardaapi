import { Router } from "express";

import { AlunosController } from "./alunos.controller";



const router = Router();



const controller =
  new AlunosController();





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





router.post(
  "/:id/responsaveis",
  controller.addResponsavel,
);





export {
  router as alunosRouter,
};