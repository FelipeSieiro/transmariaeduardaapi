import type { Request, Response } from "express";

import { VeiculosService } from "./veiculos.service.js";

import {
  createVeiculoSchema,
  updateVeiculoSchema,
  updateVeiculoStatusSchema,
} from "./veiculos.schema.js";


export class VeiculosController {


  private service: VeiculosService;



  constructor() {

    this.service =
      new VeiculosService();

  }





  async findAll(
    _req: Request,
    res: Response,
  ) {

    const data =
      await this.service.findAll();


    return res.json({
      success: true,
      data,
    });

  }








  async findById(
    req: Request,
    res: Response,
  ) {


    const id = String(req.params.id);



    const data =
      await this.service.findById(
        id,
      );



    return res.json({
      success: true,
      data,
    });

  }









  async create(
    req: Request,
    res: Response,
  ) {


    const payload =
      createVeiculoSchema.parse(
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

  }









  async update(
    req: Request,
    res: Response,
  ) {


    const idParam = String(req.params.id);
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const payload =
      updateVeiculoSchema.parse(
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

  }









  async updateStatus(
    req: Request,
    res: Response,
  ) {


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
      updateVeiculoStatusSchema.parse(
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

  }









  async delete(
    req: Request,
    res: Response,
  ) {


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
        "Veículo removido com sucesso",
    });

  }


}