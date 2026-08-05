import { z } from "zod";

// Helper para tratar strings vazias do front-end convertendo para undefined
const emptyToUndefined = (val: unknown) => 
  val === "" || val === null ? undefined : val;

export const responsavelSchema = z.object({
  nome: z.string().min(1),

  telefone: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  email: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  cpf: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  endereco: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  observacoes: z.preprocess(
    emptyToUndefined,
    z.string().optional()
  ),

  parentesco: z.string().optional(),

  responsavel_financeiro:
    z.boolean().optional().default(false),

  responsavel_emergencia:
    z.boolean().optional().default(false),
});

// =====================================================
// RELACIONAMENTO ALUNO RESPONSÁVEL
// =====================================================

export const alunoResponsavelSchema = z.object({
  responsavel_id: z.string().uuid("Responsável inválido").optional(),
  parentesco: z.string().optional(),
  responsavel_financeiro: z.boolean().optional().default(false),
  responsavel_emergencia: z.boolean().optional().default(false),
  responsavel: responsavelSchema.optional(),
});

// =====================================================
// ALUNO
// =====================================================

export const createAlunoSchema = z.object({
  matricula: z.string().min(1, "Matrícula é obrigatória"),

  nome: z.string().min(1, "Nome é obrigatório"),

  foto_url: z.preprocess(emptyToUndefined, z.string().optional()),

  data_nascimento: z.preprocess(emptyToUndefined, z.string().optional()),

  escola_id: z.preprocess(
    emptyToUndefined,
    z.string().uuid("Escola inválida").optional()
  ),

  serie: z.preprocess(emptyToUndefined, z.string().optional()),

  turno: z.preprocess(emptyToUndefined, z.string().optional()),

  endereco: z.preprocess(emptyToUndefined, z.string().optional()),

  numero: z.preprocess(emptyToUndefined, z.string().optional()),

  complemento: z.preprocess(emptyToUndefined, z.string().optional()),

  bairro: z.preprocess(emptyToUndefined, z.string().optional()),

  cidade: z.preprocess(emptyToUndefined, z.string().optional()),

  cep: z.preprocess(emptyToUndefined, z.string().optional()),

  rota_id: z.preprocess(
    emptyToUndefined,
    z.string().uuid("Rota inválida").optional()
  ),

  status: z.preprocess(emptyToUndefined, z.string().optional()),

  data_inicio: z.preprocess(emptyToUndefined, z.string().optional()),

  /**
   * Relacionamento aluno -> responsáveis
   */
  aluno_responsavel: z.array(alunoResponsavelSchema).optional(),
});

// =====================================================
// CONTRATO
// =====================================================

export const contratoSchema = z.object({
  numero: z.preprocess(emptyToUndefined, z.string().optional()),

  data_inicio: z.preprocess(emptyToUndefined, z.string().optional()),

  data_fim: z.preprocess(emptyToUndefined, z.string().nullable().optional()),

  valor_mensalidade: z.number().optional().default(0),

  dia_vencimento: z.number().optional().default(0),

  forma_pagamento: z.preprocess(emptyToUndefined, z.string().optional()),

  observacoes: z.preprocess(emptyToUndefined, z.string().optional()),

  status: z.string().optional().default("ativo"),
});

// =====================================================
// CADASTRO COMPLETO
// ALUNO + RESPONSÁVEIS + CONTRATO
// =====================================================

export const cadastroAlunoCompletoSchema = z.object({
  aluno: createAlunoSchema.omit({
    aluno_responsavel: true,
  }),

  responsaveis: z.array(responsavelSchema).default([]),

  contrato: contratoSchema.optional(),
});

export const updateAlunoSchema = z.object({
  nome: z.string().min(1).optional(),
  foto_url: z.preprocess(emptyToUndefined, z.string().optional()),
  data_nascimento: z.preprocess(emptyToUndefined, z.string().optional()),
  escola_id: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  serie: z.preprocess(emptyToUndefined, z.string().optional()),
  turno: z.preprocess(emptyToUndefined, z.string().optional()),
  endereco: z.preprocess(emptyToUndefined, z.string().optional()),
  numero: z.preprocess(emptyToUndefined, z.string().optional()),
  complemento: z.preprocess(emptyToUndefined, z.string().optional()),
  bairro: z.preprocess(emptyToUndefined, z.string().optional()),
  cidade: z.preprocess(emptyToUndefined, z.string().optional()),
  cep: z.preprocess(emptyToUndefined, z.string().optional()),
  rota_id: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  status: z.preprocess(emptyToUndefined, z.string().optional()),
  data_inicio: z.preprocess(emptyToUndefined, z.string().optional()),
});

// Tipos inferidos
export type CreateAlunoSchema = z.infer<typeof createAlunoSchema>;
export type UpdateAlunoSchema = z.infer<typeof updateAlunoSchema>;
export type ResponsavelSchema = z.infer<typeof responsavelSchema>;
export type AlunoResponsavelSchema = z.infer<typeof alunoResponsavelSchema>;
export type ContratoSchema = z.infer<typeof contratoSchema>;
export type CadastroAlunoCompletoSchema = z.infer<typeof cadastroAlunoCompletoSchema>;