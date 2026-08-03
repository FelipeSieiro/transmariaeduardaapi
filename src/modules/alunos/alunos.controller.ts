import type { Request, Response } from "express";

import { AlunosService } from "./alunos.service";

import {
  createAlunoSchema,
  updateAlunoSchema,
  alunoResponsavelSchema,
} from "./alunos.schema";



export class AlunosController {


  private service: AlunosService;



  constructor() {

    this.service =
      new AlunosService();

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


      const idParam = req.params.id;
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
        createAlunoSchema.parse(
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


      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const payload =
        updateAlunoSchema.parse(
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


      const idParam = req.params.id;
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
          "Aluno removido com sucesso",

      });


    };









  addResponsavel =
    async (
      req: Request,
      res: Response,
    ) => {


      const idParam = req.params.id;
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const payload =
        alunoResponsavelSchema.parse(
          req.body,
        );



      const data =
        await this.service.addResponsavel(
          id,
          payload,
        );



      return res.status(201).json({

        success: true,

        data,

      });


    };


}