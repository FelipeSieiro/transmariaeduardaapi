import type {
  Request,
  Response
} from "express";


import {
  ContratosService
} from "./contratos.service";


import {
  createContratoSchema,
  updateContratoSchema
} from "./contratos.schema";






export class ContratosController {



  private service: ContratosService;





  constructor(){


    this.service =
      new ContratosService();


  }









  findAll =

    async (
      _req:Request,
      res:Response
    ) => {


      const data =
        await this.service.findAll();




      return res.json({

        success:true,

        data

      });


    };









  findById =

    async (
      req:Request,
      res:Response
    ) => {


      const id = String(req.params.id);





      const data =
        await this.service.findById(
          id
        );





      return res.json({

        success:true,

        data

      });


    };









  create =

    async (
      req:Request,
      res:Response
    ) => {



      const payload =
        createContratoSchema.parse(
          req.body
        );





      const data =
        await this.service.create(
          payload
        );





      return res.status(201).json({

        success:true,

        data

      });



    };









  update =

    async (
      req:Request,
      res:Response
    ) => {



      const id = String(req.params.id);





      const payload =
        updateContratoSchema.parse(
          req.body
        );






      const data =
        await this.service.update(
          id,
          payload
        );






      return res.json({

        success:true,

        data

      });



    };









  delete =

    async (
      req:Request,
      res:Response
    ) => {



      const id = String(req.params.id);





      await this.service.delete(
        id
      );






      return res.json({

        success:true,

        message:
          "Contrato removido com sucesso"

      });



    };


}