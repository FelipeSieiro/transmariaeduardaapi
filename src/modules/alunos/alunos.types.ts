export interface Aluno {


  id: string;


  matricula: string;


  nome: string;


  foto_url?: string | null;


  data_nascimento?: string | null;


  escola_id?: string | null;


  serie?: string | null;


  turno?: string | null;


  endereco?: string | null;


  numero?: string | null;


  complemento?: string | null;


  bairro?: string | null;


  cidade?: string | null;


  cep?: string | null;


  rota_id?: string | null;


  status?: string | null;


  data_inicio?: string | null;


  created_at?: string;


  updated_at?: string;


  deleted_at?: string | null;


}









// =====================================================
// RESPONSÁVEIS
// =====================================================

export interface CreateResponsavelDTO {

  nome: string;

  telefone?: string;

  email?: string;

  cpf?: string;

  endereco?: string;

  observacoes?: string;

  parentesco?: string;

  responsavel_financeiro?: boolean;

  responsavel_emergencia?: boolean;

}


export interface CreateAlunoResponsavelDTO {

  responsavel_id: string;

  parentesco?: string;

  responsavel_financeiro?: boolean;

  responsavel_emergencia?: boolean;

}









// =====================================================
// CONTRATO
// =====================================================


export interface CreateContratoDTO {


  numero?: string;


  data_inicio?: string;


  data_fim?: string | null;


  valor_mensalidade?: number;


  dia_vencimento?: number;


  forma_pagamento?: string;


  observacoes?: string;


  status?: string;


}









// =====================================================
// ALUNO CREATE
// =====================================================


export interface CreateAlunoDTO {


  matricula: string;


  nome: string;


  foto_url?: string;


  data_nascimento?: string;


  escola_id?: string;


  serie?: string;


  turno?: string;


  endereco?: string;


  numero?: string;


  complemento?: string;


  bairro?: string;


  cidade?: string;


  cep?: string;


  rota_id?: string;


  status?: string;


  data_inicio?: string;


  aluno_responsavel?: CreateAlunoResponsavelDTO[];


}









// =====================================================
// CADASTRO COMPLETO
// ALUNO + RESPONSÁVEIS + CONTRATO
// =====================================================


export interface CreateAlunoCompletoDTO {

  aluno: CreateAlunoDTO;

  responsaveis:
    CreateResponsavelDTO[];


  contrato?:
    CreateContratoDTO;

}









// =====================================================
// UPDATE
// =====================================================


export interface UpdateAlunoDTO {


  nome?: string;


  foto_url?: string;


  data_nascimento?: string;


  escola_id?: string;


  serie?: string;


  turno?: string;


  endereco?: string;


  numero?: string;


  complemento?: string;


  bairro?: string;


  cidade?: string;


  cep?: string;


  rota_id?: string;


  status?: string;


  data_inicio?: string;


}