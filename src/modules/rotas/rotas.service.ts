// src/services/rotas.service.ts
import { RotasRepository } from "./rotas.repository";
import type {
  CreateRotaDTO,
  UpdateRotaDTO,
} from "./rotas.types";

export class RotasService {
  private repository: RotasRepository;

  constructor() {
    this.repository = new RotasRepository();
  }

  async findAll() {
    const rotas = await this.repository.findAll();
    return rotas || [];
  }

  async findById(id: string) {
    const rota = await this.repository.findById(id);

    if (!rota) {
      const error: any = new Error("Rota não encontrada");
      error.statusCode = 404;
      throw error;
    }

    return rota;
  }

  async create(payload: CreateRotaDTO) {
    try {
      const rotas = (await this.repository.findAll()) || [];

      const rotaExiste = rotas.some(
        (item) =>
          item?.nome &&
          payload?.nome &&
          item.nome.toLowerCase() === payload.nome.toLowerCase() &&
          item.deleted_at === null
      );

      if (rotaExiste) {
        const error: any = new Error("Já existe uma rota com esse nome");
        error.statusCode = 400;
        throw error;
      }

      // Executa a criação no repositório
      return await this.repository.create(payload);
    } catch (error: any) {
      // ISSO VAI IMPRIMIR O ERRO EXATO DO BANCO DE DADOS NO SEU TERMINAL NODE.JS
      console.error("🔥 ERRO DETALHADO AO CRIAR ROTA NO BANCO:", {
        message: error.message,
        detail: error.detail,
        hint: error.hint,
        code: error.code,
        payloadRecebido: payload,
      });
      throw error;
    }
  }

  async update(id: string, payload: UpdateRotaDTO) {
    await this.findById(id);

    return this.repository.update(id, payload);
  }

  async updateStatus(id: string, status: string) {
    await this.findById(id);

    return this.repository.updateStatus(id, status);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.repository.delete(id);
  }
}