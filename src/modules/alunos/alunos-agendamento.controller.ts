import { Body, Controller, Get, Param, Put } from "../../shared/nest-compat.js";
import type { AlunosAgendamentoService } from "./alunos-agendamento.service.js";
import type { SyncAgendamentosAlunoDto } from "./dtos/aluno-agendamento-rota.dto.js";

@Controller("alunos")
export class AlunosAgendamentoController {
  constructor(
    private readonly agendamentoService: AlunosAgendamentoService
  ) {}

  @Get(":alunoId/agendamentos-rotas")
  async buscarAgendamentos(@Param("alunoId") alunoId: string) {
    const data = await this.agendamentoService.listarAgendamentos(alunoId);
    return {
      success: true,
      data,
    };
  }

  @Put(":alunoId/agendamentos-rotas")
  async atualizarAgendamentos(
    @Param("alunoId") alunoId: string,
    @Body() dto: SyncAgendamentosAlunoDto
  ) {
    const data = await this.agendamentoService.sincronizarAgendamentos(
      alunoId,
      dto.agendamentos
    );
    return {
      success: true,
      message: "Grade semanal de rotas atualizada com sucesso.",
      data,
    };
  }
}