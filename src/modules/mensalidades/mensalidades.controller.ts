import type { Request, Response } from "express";

import { MensalidadesService } from "./mensalidades.service";

import {
  createMensalidadeSchema,
  updateMensalidadeSchema,
  pagarMensalidadeSchema,
  gerarMensalidadesSchema,
} from "./mensalidades.schema";

// =====================================================
// CONTROLLER DE MENSALIDADES
// =====================================================

export class MensalidadesController {
  private service: MensalidadesService;

  constructor() {
    this.service = new MensalidadesService();
  }

  // =====================================================
  // LISTAR TODAS AS MENSALIDADES
  // GET /mensalidades
  // =====================================================
  findAll = async (_req: Request, res: Response) => {
    const data = await this.service.findAll();

    return res.json({
      success: true,
      data,
    });
  };

  // =====================================================
  // BUSCAR MENSALIDADES DO CONTRATO
  // GET /mensalidades/contrato/:contratoId
  // =====================================================
  findByContrato = async (req: Request, res: Response) => {
    const contratoParam = req.params.contratoId;

    const contratoId = Array.isArray(contratoParam)
      ? contratoParam[0]
      : contratoParam;

    if (!contratoId) {
      return res.status(400).json({
        success: false,
        message: "Contrato inválido",
      });
    }

    const data = await this.service.findByContrato(contratoId);

    // Retorna status 200 com a lista (mesmo que seja vazia)
    return res.json({
      success: true,
      data: data || [],
    });
  };

  // =====================================================
  // BUSCAR MENSALIDADE POR ID
  // GET /mensalidades/:id
  // =====================================================
  findById = async (req: Request, res: Response) => {
    const idParam = String(req.params.id);

    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const data = await this.service.findById(id);

    return res.json({
      success: true,
      data,
    });
  };

  // =====================================================
  // CRIAR MENSALIDADE
  // POST /mensalidades
  // =====================================================
  create = async (req: Request, res: Response) => {
    const payload = createMensalidadeSchema.parse(req.body);

    const data = await this.service.create(payload);

    return res.status(201).json({
      success: true,
      data,
    });
  };

  // =====================================================
  // GERAR MENSALIDADES AUTOMÁTICAS
  // POST /mensalidades/gerar
  // =====================================================
  gerar = async (req: Request, res: Response) => {
    const payload = gerarMensalidadesSchema.parse(req.body);

    const data = await this.service.gerarPorContrato(
      payload.contrato_id,
      payload.quantidade
    );

    return res.status(201).json({
      success: true,
      data,
    });
  };

  // =====================================================
  // ATUALIZAR MENSALIDADE
  // PUT /mensalidades/:id
  // =====================================================
  update = async (req: Request, res: Response) => {
    const idParam = String(req.params.id);

    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const payload = updateMensalidadeSchema.parse(req.body);

    const data = await this.service.update(id, payload);

    return res.json({
      success: true,
      data,
    });
  };

  // =====================================================
  // REGISTRAR PAGAMENTO
  // PATCH /mensalidades/:id/pagar
  // =====================================================
  pagar = async (req: Request, res: Response) => {
    const idParam = String(req.params.id);

    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const payload = pagarMensalidadeSchema.parse(req.body);

    const data = await this.service.pagar(id, payload);

    return res.json({
      success: true,
      data,
    });
  };

  // =====================================================
  // DELETE (Soft delete)
  // DELETE /mensalidades/:id
  // =====================================================
  delete = async (req: Request, res: Response) => {
    const idParam = String(req.params.id);

    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    await this.service.delete(id);

    return res.json({
      success: true,
      message: "Mensalidade removida com sucesso",
    });
  };
}