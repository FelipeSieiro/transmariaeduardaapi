import { supabase } from "../../config/supabase";

import type {
  CreateContratoDTO,
  UpdateContratoDTO
} from "./contratos.types";





export class ContratosRepository {



  private readonly table =
    "contratos";









  async findAll(){



    const {
      data,
      error
    } = await supabase
      .from(this.table)
      .select(`

        *,

        alunos (

          id,

          matricula,

          nome,

          serie,

          turno,

          status,

          escola_id,

          rota_id,


          escolas (

            id,

            nome

          ),


          rotas (

            id,

            nome

          ),


          aluno_responsavel (

            parentesco,

            responsavel_financeiro,

            responsavel_emergencia,


            responsaveis (

              id,

              nome,

              telefone,

              email

            )

          )

        )

      `)
      .is(
        "deleted_at",
        null
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );






    if(error){

      throw error;

    }





    return data;



  }









  async findById(
    id:string
  ){



    const {
      data,
      error
    } = await supabase
      .from(this.table)
      .select(`

        *,

        alunos (

          id,

          matricula,

          nome,

          foto_url,

          data_nascimento,

          serie,

          turno,

          endereco,

          numero,

          bairro,

          cidade,

          cep,

          status,


          escolas (

            id,

            nome

          ),


          rotas (

            id,

            nome

          ),



          aluno_responsavel (

            parentesco,

            responsavel_financeiro,

            responsavel_emergencia,


            responsaveis (

              id,

              nome,

              telefone,

              email

            )

          )


        )

      `)
      .eq(
        "id",
        id
      )
      .is(
        "deleted_at",
        null
      )
      .single();






    if(error){

      throw error;

    }





    return data;



  }









  async create(
    payload:CreateContratoDTO
  ){



    const {
      data,
      error
    } = await supabase
      .from(this.table)
      .insert(
        payload
      )
      .select()
      .single();






    if(error){

      throw error;

    }





    return data;



  }









  async update(
    id:string,
    payload:UpdateContratoDTO
  ){



    const {
      data,
      error
    } = await supabase
      .from(this.table)
      .update(
        payload
      )
      .eq(
        "id",
        id
      )
      .select()
      .single();






    if(error){

      throw error;

    }





    return data;



  }









  async delete(
    id:string
  ){



    const {
      error
    } = await supabase
      .from(this.table)
      .update({

        deleted_at:
          new Date()
          .toISOString()

      })
      .eq(
        "id",
        id
      );






    if(error){

      throw error;

    }





    return true;



  }





}