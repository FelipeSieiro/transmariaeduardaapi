export interface Escola {
  id: string;

  nome: string;

  endereco?: string | null;

  telefone?: string | null;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;
}


export interface CreateEscolaDTO {
  nome: string;

  endereco?: string;

  telefone?: string;
}


export interface UpdateEscolaDTO {
  nome?: string;

  endereco?: string;

  telefone?: string;
}