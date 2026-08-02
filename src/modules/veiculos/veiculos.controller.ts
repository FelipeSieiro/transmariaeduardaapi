import type { Request, Response } from "express";

import { VeiculosService } from "./veiculos.service";

import {
  createVeiculoSchema,
  updateVeiculoSchema,
  updateVeiculoStatusSchema,
} from "./veiculos.schema";


export class VeiculosController {


  private service: VeiculosService;



  constructor() {

    this.service =
      new VeiculosService();

  }





  async findAll(
    req: Request,
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


    const { id } =
      req.params;



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


    const { id } =
      req.params;



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


    const { id } =
      req.params;



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


    const { id } =
      req.params;



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