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
      3. Salva o contrato no banco de dados
    */
    const novoContrato = await this.repository.create(payload);

    /*
      4. Dispara a geração automática de mensalidades usando os dados do contrato recém-criado
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
    await this.findById(id);

    // Salva as alterações do contrato
    const contratoAtualizado = await this.repository.update(id, payload);

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