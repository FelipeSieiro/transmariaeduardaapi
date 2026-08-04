import { ContratosRepository } from "./contratos.repository";
import { MensalidadesService } from "../mensalidades/mensalidades.service";

import type {
  CreateContratoDTO,
  UpdateContratoDTO,
} from "./contratos.types";

import { supabase } from "../../config/supabase";

export class ContratosService {
  private repository: ContratosRepository;
  private mensalidadesService: MensalidadesService;

  constructor() {
    this.repository = new ContratosRepository();
    this.mensalidadesService = new MensalidadesService();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const contrato = await this.repository.findById(id);

    if (!contrato) {
      throw new Error("Contrato não encontrado");
    }

    return contrato;
  }

  // =====================================================
  // INATIVAR CONTRATOS ANTERIORES DO ALUNO
  // =====================================================
  private async inativarContratosAnterioresDoAluno(alunoId: string, ignorarContratoId?: string) {
    // 1. Busca os IDs de todos os contratos ativos (independente de caixa alta/baixa)
    let queryBusca = supabase
      .from("contratos")
      .select("id")
      .eq("aluno_id", alunoId)
      .in("status", ["ativo", "ATIVO", "Ativo"])
      .is("deleted_at", null);

    if (ignorarContratoId) {
      queryBusca = queryBusca.neq("id", ignorarContratoId);
    }

    const { data: ativos, error: errorBusca } = await queryBusca;

    if (errorBusca) {
      console.error("Erro ao buscar contratos ativos para inativação:", errorBusca);
      return;
    }

    if (!ativos || ativos.length === 0) return;

    const idsParaInativar = ativos.map((c) => c.id);

    // 2. Atualiza todos os antigos para 'inativo'
    const { error: errorUpdate } = await supabase
      .from("contratos")
      .update({
        status: "inativo",
        updated_at: new Date().toISOString(),
      })
      .in("id", idsParaInativar);

    if (errorUpdate) {
      console.error("Erro ao inativar contratos anteriores do aluno:", errorUpdate);
    }
  }

  // =====================================================
  // CRIAR CONTRATO + GERAR MENSALIDADES AUTOMÁTICAS
  // =====================================================
  async create(payload: CreateContratoDTO) {
    /*
      1. Verifica se aluno existe
    */
    const { data: aluno } = await supabase
      .from("alunos")
      .select("id")
      .eq("id", payload.aluno_id)
      .is("deleted_at", null)
      .single();

    if (!aluno) {
      throw new Error("Aluno não encontrado");
    }

    /*
      2. Verifica número duplicado
    */
    const { data: contratoExistente } = await supabase
      .from("contratos")
      .select("id")
      .eq("numero", payload.numero)
      .is("deleted_at", null)
      .maybeSingle();

    if (contratoExistente) {
      throw new Error("Número de contrato já cadastrado");
    }

    /*
      3. Normaliza status e inativa os contratos anteriores antes de criar o novo
    */
    const statusNovoContrato = payload.status ? payload.status.toLowerCase() : "ativo";

    if (statusNovoContrato === "ativo") {
      await this.inativarContratosAnterioresDoAluno(payload.aluno_id);
    }

    /*
      4. Salva o contrato no banco de dados
    */
    const novoContrato = await this.repository.create({
      ...payload,
      status: statusNovoContrato,
    });

    /*
      5. Dispara a geração automática de mensalidades usando os dados do contrato recém-criado
    */
    if (novoContrato && novoContrato.id) {
      try {
        await this.mensalidadesService.gerarPorContrato(novoContrato.id);
      } catch (error) {
        console.error("Erro ao gerar mensalidades automáticas:", error);
      }
    }

    return novoContrato;
  }

  // =====================================================
  // ATUALIZAR CONTRATO
  // =====================================================
  async update(id: string, payload: UpdateContratoDTO) {
    const contratoExistente = await this.findById(id);

    const statusAtualizado = payload.status ? payload.status.toLowerCase() : undefined;

    if (statusAtualizado === "ativo") {
      const alunoId = payload.aluno_id || contratoExistente.aluno_id;
      await this.inativarContratosAnterioresDoAluno(alunoId, id);
    }

    // Salva as alterações do contrato
    const contratoAtualizado = await this.repository.update(id, {
      ...payload,
      ...(statusAtualizado && { status: statusAtualizado }),
    });

    return contratoAtualizado;
  }

  // =====================================================
  // EXCLUIR CONTRATO
  // =====================================================
  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}