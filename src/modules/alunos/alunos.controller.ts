import type { Request, Response } from "express";
import { ZodError } from "zod";

import { AlunosService } from "./alunos.service";
import {
  createAlunoSchema,
  updateAlunoSchema,
  responsavelSchema,
  cadastroAlunoCompletoSchema,
} from "./alunos.schema";

export class AlunosController {
  private service: AlunosService;

  constructor() {
    this.service = new AlunosService();
  }

  // =====================================================
  // HELPER PARA TRATAMENTO DE ERROS
  // =====================================================

  private handleError(res: Response, error: unknown, defaultMessage: string) {
    console.error(`[AlunosController Error]: ${defaultMessage}`, error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Erro de validação nos dados enviados",
        errors: error.flatten().fieldErrors,
      });
    }

    const message = error instanceof Error ? error.message : defaultMessage;
    return res.status(500).json({
      success: false,
      message,
    });
  }

  // =====================================================
  // LISTAR ALUNOS
  // =====================================================

  findAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.findAll();

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao buscar alunos");
    }
  };

  // =====================================================
  // BUSCAR ALUNO POR ID
  // =====================================================

  findById = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
      return this.handleError(res, error, "Erro ao buscar aluno");
    }
  };

  // =====================================================
  // CADASTRO INDIVIDUAL
  // =====================================================

  create = async (req: Request, res: Response) => {
    try {
      const payload = createAlunoSchema.parse(req.body);
      const data = await this.service.create(payload);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao cadastrar aluno");
    }
  };

  // =====================================================
  // CADASTRO COMPLETO
  // ALUNO + RESPONSÁVEIS + CONTRATO
  // =====================================================

  createCompleto = async (req: Request, res: Response) => {
    try {
      const payload = cadastroAlunoCompletoSchema.parse(req.body);
      const data = await this.service.createCompleto(payload);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao realizar cadastro completo do aluno");
    }
  };

  // =====================================================
  // ATUALIZAR ALUNO
  // =====================================================

  update = async (req: Request, res: Response) => {
    try {
      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const payload = updateAlunoSchema.parse(req.body);
      const data = await this.service.update(id, payload);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao atualizar aluno");
    }
  };

  // =====================================================
  // REMOVER ALUNO
  // =====================================================

  delete = async (req: Request, res: Response) => {
    try {
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
        message: "Aluno removido com sucesso",
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao remover aluno");
    }
  };

  // =====================================================
  // ADICIONAR RESPONSÁVEL EM ALUNO EXISTENTE
  // =====================================================

  addResponsavel = async (req: Request, res: Response) => {
    try {
      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const payload = responsavelSchema.parse(req.body);
      const data = await this.service.addResponsavel(id, payload);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao adicionar responsável");
    }
  };

  // =====================================================
  // BUSCAR AGENDAMENTOS DE ROTAS DO ALUNO
  // =====================================================

  getAgendamentosRotas = async (req: Request, res: Response) => {
    try {
      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const data = await this.service.getAgendamentosRotas(id);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao buscar agendamentos de rotas do aluno");
    }
  };

  // =====================================================
  // SINCRONIZAR AGENDAMENTOS DE ROTAS DO ALUNO
  // =====================================================

  syncAgendamentosRotas = async (req: Request, res: Response) => {
    try {
      const idParam = String(req.params.id);
      const id = Array.isArray(idParam) ? idParam[0] : idParam;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const data = await this.service.syncAgendamentosRotas(id, req.body);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return this.handleError(res, error, "Erro ao sincronizar agendamentos de rotas");
    }
  };
}