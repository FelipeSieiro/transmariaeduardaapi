import { AlunosRepository } from "./alunos.repository";

import type {
  CreateAlunoDTO,
  UpdateAlunoDTO,
  CreateAlunoResponsavelDTO,
} from "./alunos.types";

import { supabase } from "../../config/supabase";



export class AlunosService {


  private repository: AlunosRepository;



  constructor() {

    this.repository =
      new AlunosRepository();

  }







  async findAll() {

    return this.repository.findAll();

  }









  async findById(
    id: string,
  ) {


    const aluno =
      await this.repository.findById(
        id,
      );



    if (!aluno) {

      throw new Error(
        "Aluno não encontrado",
      );

    }



    return aluno;

  }









  async create(
    payload: CreateAlunoDTO,
  ) {


    const {
      data: alunoExistente,
    } =
      await supabase
        .from("alunos")
        .select("id")
        .eq(
          "matricula",
          payload.matricula,
        )
        .is(
          "deleted_at",
          null,
        )
        .maybeSingle();



    if (alunoExistente) {

      throw new Error(
        "Matrícula já cadastrada",
      );

    }






    if (payload.escola_id) {


      const {
        data: escola,
      } =
        await supabase
          .from("escolas")
          .select("id")
          .eq(
            "id",
            payload.escola_id,
          )
          .single();



      if (!escola) {

        throw new Error(
          "Escola não encontrada",
        );

      }

    }







    if (payload.rota_id) {


      const {
        data: rota,
      } =
        await supabase
          .from("rotas")
          .select("id")
          .eq(
            "id",
            payload.rota_id,
          )
          .single();



      if (!rota) {

        throw new Error(
          "Rota não encontrada",
        );

      }

    }






    return this.repository.create(
      payload,
    );

  }









  async update(
    id: string,
    payload: UpdateAlunoDTO,
  ) {


    await this.findById(
      id,
    );



    return this.repository.update(
      id,
      payload,
    );

  }









  async delete(
    id: string,
  ) {


    await this.findById(
      id,
    );



    return this.repository.delete(
      id,
    );

  }









  async addResponsavel(
    alunoId: string,
    payload: CreateAlunoResponsavelDTO,
  ) {


    await this.findById(
      alunoId,
    );



    return this.repository.addResponsavel(
      alunoId,
      payload,
    );

  }


}