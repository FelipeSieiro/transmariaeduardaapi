import type { Request, Response } from "express";

import { RotasService } from "./rotas.service.js";

import {
  createRotaSchema,
  updateRotaSchema,
  updateRotaStatusSchema,
} from "./rotas.schema.js";



export class RotasController {


  private service: RotasService;



  constructor() {

    this.service =
      new RotasService();

  }







  findAll =
    async (
      _req: Request,
      res: Response,
    ) => {


      const data =
        await this.service.findAll();



      return res.json({

        success: true,

        data,

      });


    };









  findById =
    async (
      req: Request,
      res: Response,
    ) => {


      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const data =
        await this.service.findById(
          id,
        );



      return res.json({

        success: true,

        data,

      });


    };









  create =
    async (
      req: Request,
      res: Response,
    ) => {


      const payload =
        createRotaSchema.parse(
          req.body,
        );



      const data =
        await this.service.create(
          payload,
        );



      return res.status(201).json({

        success: true,

        data,

      });


    };









  update =
    async (
      req: Request,
      res: Response,
    ) => {


      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const payload =
        updateRotaSchema.parse(
          req.body,
        );



      const data =
        await this.service.update(
          id,
          payload,
        );



      return res.json({

        success: true,

        data,

      });


    };









  updateStatus =
    async (
      req: Request,
      res: Response,
    ) => {


      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const {
        status,
      } =
        updateRotaStatusSchema.parse(
          req.body,
        );



      const data =
        await this.service.updateStatus(
          id,
          status,
        );



      return res.json({

        success: true,

        data,

      });


    };









  delete =
    async (
      req: Request,
      res: Response,
    ) => {


      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      await this.service.delete(
        id,
      );



      return res.json({

        success: true,

        message:
          "Rota removida com sucesso",

      });


    };


}