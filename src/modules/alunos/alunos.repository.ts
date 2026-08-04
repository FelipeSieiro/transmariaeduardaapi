import { supabase } from "../../config/supabase";

import type {
  CreateAlunoDTO,
  UpdateAlunoDTO,
  CreateAlunoResponsavelDTO,
} from "./alunos.types";



export class AlunosRepository {


  private readonly table = "alunos";







  async findAll() {


    const {

      data,

      error

    } = await supabase

      .from(this.table)

      .select(`

        *,

        escolas(

          id,

          nome

        ),


        rotas(

          id,

          nome

        ),


        aluno_responsavel(

          id,

          parentesco,

          responsavel_financeiro,

          responsavel_emergencia,


          responsaveis(

            id,

            nome,

            telefone,

            email,

            cpf,

            endereco,

            observacoes

          )

        ),



        contratos(

          id,

          numero,

          data_inicio,

          data_fim,

          valor_mensalidade,

          dia_vencimento,

          forma_pagamento,

          observacoes,

          status,


          mensalidades(

            id,

            competencia,

            valor,

            data_vencimento,

            status,

            data_pagamento,

            forma_pagamento,

            observacoes

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



        escolas(

          id,

          nome

        ),



        rotas(

          id,

          nome

        ),



        aluno_responsavel(

          id,

          parentesco,

          responsavel_financeiro,

          responsavel_emergencia,


          responsaveis(

            id,

            nome,

            telefone,

            email,

            cpf,

            endereco,

            observacoes

          )

        ),





        contratos(


          id,


          numero,


          data_inicio,


          data_fim,


          valor_mensalidade,


          dia_vencimento,


          forma_pagamento,


          observacoes,


          status,





          mensalidades(


            id,


            competencia,


            valor,


            data_vencimento,


            status,


            data_pagamento,


            forma_pagamento,


            observacoes


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

    payload:CreateAlunoDTO

  ){



    const {

      aluno_responsavel,

      ...dadosAluno

    } = payload;







    const {

      data: aluno,

      error

    } = await supabase

      .from(this.table)

      .insert(

        dadosAluno

      )

      .select()

      .single();







    if(error){

      throw error;

    }









    if(

      aluno_responsavel &&

      aluno_responsavel.length

    ){



      const relacionamentos =

        aluno_responsavel.map(

          item => ({



            aluno_id:

              aluno.id,



            responsavel_id:

              item.responsavel_id,



            parentesco:

              item.parentesco ?? null,



            responsavel_financeiro:

              item.responsavel_financeiro ?? false,



            responsavel_emergencia:

              item.responsavel_emergencia ?? false,


          })

        );







      const {

        error:

        erroResponsavel

      } = await supabase

        .from(

          "aluno_responsavel"

        )

        .insert(

          relacionamentos

        );







      if(erroResponsavel){

        throw erroResponsavel;

      }


    }







    return this.findById(

      aluno.id

    );


  }















  async update(

    id:string,

    payload:UpdateAlunoDTO

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















  async addResponsavel(

    alunoId:string,

    payload:CreateAlunoResponsavelDTO

  ){



    const {

      data,

      error

    } = await supabase

      .from(

        "aluno_responsavel"

      )

      .insert({



        aluno_id:

          alunoId,



        responsavel_id:

          payload.responsavel_id,



        parentesco:

          payload.parentesco ?? null,



        responsavel_financeiro:

          payload.responsavel_financeiro ?? false,



        responsavel_emergencia:

          payload.responsavel_emergencia ?? false,


      })

      .select()

      .single();







    if(error){

      throw error;

    }







    return data;


  }


}