import { Injectable, NotFoundException } from "../../shared/nest-compat";
import { supabase } from "../../config/supabase";

import type { ItemAgendamentoRotaDto } from "./dtos/aluno-agendamento-rota.dto";


@Injectable()
export class AlunosAgendamentoService {


  async buscarAgendamentos(alunoId: string) {


    const { data: aluno, error } =
      await supabase
        .from("alunos")
        .select("id")
        .eq("id", alunoId)
        .single();


    if (error || !aluno) {
      throw new NotFoundException(
        "Aluno não encontrado"
      );
    }


    const { data, error: agendamentoError } =
      await supabase
        .from("aluno_agendamento_rota")
        .select("*")
        .eq("aluno_id", alunoId);


    if (agendamentoError) {
      throw agendamentoError;
    }


    return data ?? [];
  }






  async listarAgendamentos(alunoId: string) {
    return this.buscarAgendamentos(alunoId);
  }

  async sincronizarAgendamentos(
    alunoId: string,
    itens: ItemAgendamentoRotaDto[]
  ) {


    const { data: aluno } =
      await supabase
        .from("alunos")
        .select("id")
        .eq("id", alunoId)
        .single();


    if (!aluno) {
      throw new NotFoundException(
        "Aluno não encontrado"
      );
    }


    await supabase
      .from("aluno_agendamento_rota")
      .delete()
      .eq("aluno_id", alunoId);



    if (!itens.length) {
      return [];
    }



    const payload = itens.map(item => ({
      aluno_id: alunoId,
      ...item
    }));


    const { data, error } =
      await supabase
        .from("aluno_agendamento_rota")
        .insert(payload)
        .select();



    if (error) {
      throw error;
    }


    return data;
  }

}
