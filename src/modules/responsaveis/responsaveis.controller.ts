import type { Request, Response } from "express";

import { ResponsaveisService } from "./responsaveis.service.js";

import {
  createResponsavelSchema,
  updateResponsavelSchema,
} from "./responsaveis.schema.js";



export class ResponsaveisController {


  private service: ResponsaveisService;



  constructor() {

    this.service =
      new ResponsaveisService();

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
        createResponsavelSchema.parse(
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
        updateResponsavelSchema.parse(
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
          "Responsável removido com sucesso",

      });


    };


}