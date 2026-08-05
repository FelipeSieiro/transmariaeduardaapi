export interface Responsavel {

  id: string;

  nome: string;

  cpf?: string | null;

  telefone?: string | null;

  email?: string | null;

  endereco?: string | null;

  observacoes?: string | null;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;

}





export interface CreateResponsavelDTO {

  nome: string;

  cpf?: string;

  telefone?: string;

  email?: string;

  endereco?: string;

  observacoes?: string;

}





export interface UpdateResponsavelDTO {

  nome?: string;

  cpf?: string;

  telefone?: string;

  email?: string;

  endereco?: string;

  observacoes?: string;

}