import { MensalidadesRepository } from "./mensalidades.repository";
import type {
  CreateMensalidadeDTO,
  UpdateMensalidadeDTO,
  PagarMensalidadeDTO,
} from "./mensalidades.types";
import { supabase } from "../../config/supabase";

export class MensalidadesService {
  private repository: MensalidadesRepository;

  constructor() {
    this.repository = new MensalidadesRepository();
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    const mensalidade = await this.repository.findById(id);

    if (!mensalidade) {
      throw new Error("Mensalidade não encontrada");
    }

    return mensalidade;
  }

  // =====================================================
  // BUSCAR POR CONTRATO (Garante lista vazia se não encontrar)
  // =====================================================
  async findByContrato(contratoId: string) {
    const data = await this.repository.findByContrato(contratoId);
    return data || [];
  }

  // =====================================================
  // CRIAR MENSALIDADE MANUAL
  // =====================================================
  async create(payload: CreateMensalidadeDTO) {
    const { data: contrato } = await supabase
      .from("contratos")
      .select("id, valor_mensalidade, dia_vencimento")
      .eq("id", payload.contrato_id)
      .is("deleted_at", null)
      .single();

    if (!contrato) {
      throw new Error("Contrato não encontrado");
    }

    const valorFinal = payload.valor ?? contrato.valor_mensalidade;

    return this.repository.create({
      ...payload,
      valor: valorFinal,
    });
  }

  async update(id: string, payload: UpdateMensalidadeDTO) {
    await this.findById(id);
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.repository.delete(id);
  }

  async pagar(id: string, payload: PagarMensalidadeDTO) {
    const mensalidade = await this.findById(id);

    if (mensalidade.status === "pago") {
      throw new Error("Mensalidade já está paga");
    }

    return this.repository.pagar(id, payload);
  }

  // =====================================================
  // GERAR MENSALIDADES AUTOMÁTICAS BASEADAS NO CONTRATO
  // =====================================================
  async gerarPorContrato(contratoId: string, quantidadeParam?: number) {
    // 1. Busca os dados exatos do contrato
    const { data: contrato, error: errorContrato } = await supabase
      .from("contratos")
      .select(`
        id,
        valor_mensalidade,
        data_inicio,
        data_fim,
        dia_vencimento
      `)
      .eq("id", contratoId)
      .is("deleted_at", null)
      .single();

    if (errorContrato || !contrato) {
      throw new Error("Contrato não encontrado ou inativo");
    }

    if (!contrato.data_inicio) {
      throw new Error("Contrato não possui data de início definida.");
    }

    // 2. Extrai ano e mês de início sem sofrem com timezone (Split direto da string YYYY-MM-DD)
    const [anoIniStr, mesIniStr] = String(contrato.data_inicio).split("-");
    const anoInicial = parseInt(anoIniStr, 10);
    const mesInicial = parseInt(mesIniStr, 10) - 1; // Mês 0-indexed (Jan = 0)

    let quantidade = 12; // Padrão genérico se o contrato não tiver data_fim

    // 3. Trava de limite pelo tempo do contrato
    if (contrato.data_fim) {
      const [anoFimStr, mesFimStr] = String(contrato.data_fim).split("-");
      const anoFim = parseInt(anoFimStr, 10);
      const mesFim = parseInt(mesFimStr, 10) - 1;

      // Duração exata do contrato em meses (inclusivo)
      const duracaoContratoEmMeses = (anoFim - anoInicial) * 12 + (mesFim - mesInicial) + 1;

      if (duracaoContratoEmMeses > 0) {
        if (quantidadeParam) {
          // Impede ultrapassar o tempo limite do contrato mesmo se solicitado via parâmetro
          quantidade = Math.min(quantidadeParam, duracaoContratoEmMeses);
        } else {
          quantidade = duracaoContratoEmMeses;
        }
      }
    } else if (quantidadeParam) {
      quantidade = quantidadeParam;
    }

    // 4. Limpa mensalidades PENDENTES já existentes para este contrato (evita duplicidade ao regerar)
    await supabase
      .from("mensalidades")
      .delete()
      .eq("contrato_id", contratoId)
      .eq("status", "pendente");

    const mensalidades = [];

    // 5. Gera exatamente a quantidade permitida dentro do período do contrato
    for (let i = 0; i < quantidade; i++) {
      const dataCorrente = new Date(anoInicial, mesInicial + i, 1);
      const ano = dataCorrente.getFullYear();
      const mes = dataCorrente.getMonth();

      // Ajusta o dia de vencimento para meses curtos (ex: dia 31 em Fevereiro/Abril)
      const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
      const diaVencimento = Math.min(contrato.dia_vencimento, ultimoDiaDoMes);

      const mesFormatado = String(mes + 1).padStart(2, "0");
      const diaFormatado = String(diaVencimento).padStart(2, "0");

      const competencia = `${ano}-${mesFormatado}`;
      const dataVencimento = `${ano}-${mesFormatado}-${diaFormatado}`;

      mensalidades.push({
        contrato_id: contrato.id,
        competencia,
        valor: contrato.valor_mensalidade,
        data_vencimento: dataVencimento,
        status: "pendente",
      });
    }

    // 6. Insere no Supabase
    const { data, error } = await supabase
      .from("mensalidades")
      .insert(mensalidades)
      .select();

    if (error) {
      console.error("Erro ao inserir mensalidades no Supabase:", error);
      throw error;
    }

    return data;
  }
}