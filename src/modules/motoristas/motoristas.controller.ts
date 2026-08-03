import type { Request, Response } from "express";

import { MotoristasService } from "./motoristas.service";

import {
  createMotoristaSchema,
  updateMotoristaSchema,
  updateStatusMotoristaSchema,
} from "./motoristas.schema";



export class MotoristasController {


  private service: MotoristasService;



  constructor() {

    this.service =
      new MotoristasService();

  }







  async findAll(
    _req: Request,
    res: Response,
  ) {

    try {


      const motoristas =
        await this.service.findAll();



      return res.status(200).json({

        success: true,

        data: motoristas,

      });



    } catch (error) {


      return res.status(500).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erro ao buscar motoristas",

      });


    }

  }









  async findById(
    req: Request,
    res: Response,
  ) {

    try {


      const { id } =
        req.params;



      const motorista =
        await this.service.findById(
          id,
        );



      return res.status(200).json({

        success: true,

        data: motorista,

      });



    } catch (error) {


      return res.status(404).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Motorista não encontrado",

      });


    }

  }









  async create(
    req: Request,
    res: Response,
  ) {

    try {


      const payload =
        createMotoristaSchema.parse(
          req.body,
        );



      const motorista =
        await this.service.create(
          payload,
        );



      return res.status(201).json({

        success: true,

        data: motorista,

      });



    } catch (error) {


      return res.status(400).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erro ao criar motorista",

      });


    }

  }









  async update(
    req: Request,
    res: Response,
  ) {


    try {


      const { id } =
        req.params;



      const payload =
        updateMotoristaSchema.parse(
          req.body,
        );



      const motorista =
        await this.service.update(
          id,
          payload,
        );



      return res.status(200).json({

        success: true,

        data: motorista,

      });



    } catch (error) {


      return res.status(400).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar motorista",

      });


    }

  }









  async delete(
    req: Request,
    res: Response,
  ) {


    try {


      const { id } =
        req.params;



      await this.service.delete(
        id,
      );



      return res.status(200).json({

        success: true,

        message:
          "Motorista removido com sucesso",

      });



    } catch (error) {


      return res.status(400).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erro ao remover motorista",

      });


    }

  }









  async updateStatus(
    req: Request,
    res: Response,
  ) {


    try {


      const { id } =
        req.params;



      const payload =
        updateStatusMotoristaSchema.parse(
          req.body,
        );



      const motorista =
        await this.service.updateStatus(
          id,
          payload.status,
        );



      return res.status(200).json({

        success: true,

        data: motorista,

      });



    } catch (error) {


      return res.status(400).json({

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar status",

      });


    }

  }


}