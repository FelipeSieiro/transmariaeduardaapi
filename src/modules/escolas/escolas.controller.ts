import type { Request, Response } from "express";

import { EscolasService } from "./escolas.service.js";

import {
  createEscolaSchema,
  updateEscolaSchema,
} from "./escolas.schema.js";


export class EscolasController {


  private service: EscolasService;


  constructor() {
    this.service = new EscolasService();
  }




  async findAll(
    _req: Request,
    res: Response,
  ) {

    try {

      const escolas =
        await this.service.findAll();


      return res.status(200).json({
        success: true,
        data: escolas,
      });


    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao buscar escolas",
      });

    }

  }






  async findById(
    req: Request,
    res: Response,
  ) {

    try {

      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const escola =
        await this.service.findById(id);


      return res.status(200).json({
        success: true,
        data: escola,
      });



    } catch (error) {

      return res.status(404).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Escola não encontrada",
      });

    }

  }







  async create(
    req: Request,
    res: Response,
  ) {


    try {


      const payload =
        createEscolaSchema.parse(
          req.body,
        );



      const escola =
        await this.service.create(
          payload,
        );



      return res.status(201).json({
        success: true,
        data: escola,
      });



    } catch (error) {


      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao criar escola",
      });


    }

  }








  async update(
    req: Request,
    res: Response,
  ) {


    try {


      const id = String(req.params.id);



      const payload =
        updateEscolaSchema.parse(
          req.body,
        );



      const escola =
        await this.service.update(
          id,
          payload,
        );



      return res.status(200).json({
        success: true,
        data: escola,
      });



    } catch (error) {


      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar escola",
      });


    }

  }









  async delete(
    req: Request,
    res: Response,
  ) {


    try {


      const id = String(req.params.id);



      await this.service.delete(
        id,
      );



      return res.status(200).json({
        success: true,
        message:
          "Escola removida com sucesso",
      });



    } catch (error) {


      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro ao remover escola",
      });


    }

  }


}