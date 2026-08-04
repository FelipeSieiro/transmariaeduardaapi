import { Injectable, NotFoundException } from "@nestjs/common";
import type { PrismaService } from "@/prisma/prisma.service";
import type { ItemAgendamentoRotaDto } from "./dtos/aluno-agendamento-rota.dto";

@Injectable()
export class AlunosAgendamentoService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Lista a grade semanal de agendamentos de rotas do aluno
   */
  async listarAgendamentos(alunoId: string) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      throw new NotFoundException("Aluno não encontrado.");
    }

    return this.prisma.alunoAgendamentoRota.findMany({
      where: {
        aluno_id: alunoId,
        deleted_at: null,
      },
      include: {
        rota: {
          select: {
            id: true,
            nome: true,
            bairro: true,
            horario_saida: true,
            horario_retorno: true,
          },
        },
      },
      orderBy: [{ dia_semana: "asc" }, { tipo_trajeto: "asc" }],
    });
  }

  /**
   * Substitui/Sincroniza a grade semanal de rotas do aluno
   */
  async sincronizarAgendamentos(
    alunoId: string,
    agendamentos: ItemAgendamentoRotaDto[]
  ) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id: alunoId },
    });

    if (!aluno) {
      throw new NotFoundException("Aluno não encontrado.");
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Invalida / Deleta fisicamente todos os agendamentos anteriores do aluno
      // Caso sua tabela use Soft Delete padrão via update, marcamos deleted_at:
      await tx.alunoAgendamentoRota.updateMany({
        where: {
          aluno_id: alunoId,
          deleted_at: null,
        },
        data: {
          deleted_at: new Date(),
        },
      });

      // Também removemos fisicamente qualquer registro antigo para evitar acúmulo no banco
      await tx.alunoAgendamentoRota.deleteMany({
        where: { aluno_id: alunoId },
      });

      if (!agendamentos || agendamentos.length === 0) {
        return [];
      }

      // 2. Remove possíveis duplicidades enviadas no próprio Payload (mesmo dia + mesmo trajeto)
      const agendamentosUnicosMap = new Map<string, ItemAgendamentoRotaDto>();
      
      agendamentos.forEach((item) => {
        // Chave única composta por dia + tipo_trajeto (ou rota) para evitar registros idênticos repetidos
        const chaveUnica = `${item.dia_semana}-${item.tipo_trajeto ?? 'ida'}-${item.rota_id}`;
        agendamentosUnicosMap.set(chaveUnica, item);
      });

      const agendamentosFiltrados = Array.from(agendamentosUnicosMap.values());

      // 3. Prepara e insere os novos registros zerados
      const novosRegistros = agendamentosFiltrados.map((item) => ({
        aluno_id: alunoId,
        rota_id: item.rota_id,
        dia_semana: Number(item.dia_semana),
        tipo_trajeto: item.tipo_trajeto,
        horario: item.horario?.length === 5 ? `${item.horario}:00` : item.horario,
        observacao: item.observacao || null,
        deleted_at: null,
      }));

      await tx.alunoAgendamentoRota.createMany({
        data: novosRegistros,
      });

      // 4. Retorna apenas os agendamentos ativos atualizados com os dados das rotas
      return tx.alunoAgendamentoRota.findMany({
        where: {
          aluno_id: alunoId,
          deleted_at: null,
        },
        include: {
          rota: {
            select: {
              id: true,
              nome: true,
              bairro: true,
            },
          },
        },
        orderBy: [{ dia_semana: "asc" }, { tipo_trajeto: "asc" }],
      });
    });
  }
}