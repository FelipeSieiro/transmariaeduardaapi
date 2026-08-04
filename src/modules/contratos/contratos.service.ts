import { ContratosRepository } from "./contratos.repository";

import type {
  CreateContratoDTO,
  UpdateContratoDTO,
} from "./contratos.types";

import { supabase } from "../../config/supabase";





export class ContratosService {



  private repository: ContratosRepository;





  constructor(){

    this.repository =
      new ContratosRepository();

  }








  async findAll(){


    return this.repository.findAll();


  }









  async findById(
    id:string
  ){


    const contrato =
      await this.repository.findById(
        id
      );



    if(!contrato){


      throw new Error(
        "Contrato não encontrado"
      );


    }



    return contrato;


  }









  async create(
    payload:CreateContratoDTO
  ){



    /*
      Verifica se aluno existe
    */


    const {
      data: aluno,
    } = await supabase
      .from("alunos")
      .select("id")
      .eq(
        "id",
        payload.aluno_id
      )
      .is(
        "deleted_at",
        null
      )
      .single();





    if(!aluno){


      throw new Error(
        "Aluno não encontrado"
      );


    }








    /*
      Verifica número duplicado
    */


    const {
      data: contratoExistente
    } = await supabase
      .from("contratos")
      .select("id")
      .eq(
        "numero",
        payload.numero
      )
      .is(
        "deleted_at",
        null
      )
      .maybeSingle();






    if(contratoExistente){


      throw new Error(
        "Número de contrato já cadastrado"
      );


    }








    return this.repository.create(
      payload
    );


  }









  async update(
    id:string,
    payload:UpdateContratoDTO
  ){



    await this.findById(
      id
    );




    return this.repository.update(
      id,
      payload
    );


  }









  async delete(
    id:string
  ){



    await this.findById(
      id
    );




    return this.repository.delete(
      id
    );


  }





}