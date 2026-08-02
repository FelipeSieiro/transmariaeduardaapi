import { Request, Response } from "express";

import { RotasService } from "./rotas.service";

import {
  createRotaSchema,
  updateRotaSchema,
  updateRotaStatusSchema,
} from "./rotas.schema";



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


      const {
        id,
      } = req.params;



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


      const {
        id,
      } = req.params;



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


      const {
        id,
      } = req.params;



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


      const {
        id,
      } = req.params;



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