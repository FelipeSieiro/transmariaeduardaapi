import { randomUUID } from "node:crypto";
import { AlunosRepository } from "./alunos.repository";
import type {
  CreateAlunoDTO,
  UpdateAlunoDTO,
  CreateAlunoResponsavelDTO,
  CreateAlunoCompletoDTO,
} from "./alunos.types";
import { supabase } from "../../config/supabase";

export class AlunosService {
  private repository: AlunosRepository;

  constructor() {
    this.repository = new AlunosRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const aluno = await this.repository.findById(id);

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    return aluno;
  }

  async create(payload: CreateAlunoDTO) {
    // 1. Se a matrícula NÃO foi informada, gera um UUID automático e atribui ao id e à matrícula
    if (!payload.matricula || payload.matricula.trim() === "") {
      const novoId = randomUUID();
      payload.id = novoId; // Garante que o ID será o mesmo
      payload.matricula = novoId; // A matrícula passa a ser o mesmo UUID
    } else {
      // 2. Se a matrícula FOI informada manualmente, verifica se já existe no banco
      const { data: alunoExistente } = await supabase
        .from("alunos")
        .select("id")
        .eq("matricula", payload.matricula)
        .is("deleted_at", null)
        .maybeSingle();

      if (alunoExistente) {
        throw new Error("Matrícula já cadastrada");
      }
    }

    // Validações de Escola e Rota
    if (payload.escola_id) {
      const { data: escola } = await supabase
        .from("escolas")
        .select("id")
        .eq("id", payload.escola_id)
        .single();

      if (!escola) {
        throw new Error("Escola não encontrada");
      }
    }

    if (payload.rota_id) {
      const { data: rota } = await supabase
        .from("rotas")
        .select("id")
        .eq("id", payload.rota_id)
        .single();

      if (!rota) {
        throw new Error("Rota não encontrada");
      }
    }

    return this.repository.create(payload);
  }

  // =====================================================
  // CADASTRO COMPLETO (ALUNO + RESPONSÁVEIS + CONTRATO)
  // =====================================================
  async createCompleto(payload: CreateAlunoCompletoDTO) {
    const aluno = await this.create(payload.aluno);

    if (payload.responsaveis && payload.responsaveis.length > 0) {
      for (const responsavel of payload.responsaveis) {
        await this.repository.addResponsavel(aluno.id, responsavel);
      }
    }

    if (payload.contrato) {
      const { error } = await supabase.from("contratos").insert({
        aluno_id: aluno.id,
        numero: payload.contrato.numero,
        data_inicio: payload.contrato.data_inicio,
        data_fim: payload.contrato.data_fim ?? null,
        valor_mensalidade: payload.contrato.valor_mensalidade ?? 0,
        dia_vencimento: payload.contrato.dia_vencimento ?? 0,
        forma_pagamento: payload.contrato.forma_pagamento,
        observacoes: payload.contrato.observacoes,
        status: payload.contrato.status ?? "ativo",
      });

      if (error) {
        throw new Error("Erro ao criar contrato: " + error.message);
      }
    }

    return this.repository.findById(aluno.id);
  }

  async update(id: string, payload: UpdateAlunoDTO) {
    await this.findById(id);
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async addResponsavel(alunoId: string, payload: CreateAlunoResponsavelDTO) {
    await this.findById(alunoId);
    return this.repository.addResponsavel(alunoId, payload);
  }
}