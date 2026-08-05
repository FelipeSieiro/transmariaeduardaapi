export interface Motorista {
  id: string;

  nome: string;

  cpf?: string | null;

  telefone?: string | null;

  cnh?: string | null;

  categoria_cnh?: string | null;

  salario?: number | null;

  status?: string | null;

  created_at?: string | null;

  updated_at?: string | null;

  deleted_at?: string | null;
}



export interface CreateMotoristaDTO {

  nome: string;

  cpf?: string;

  telefone?: string;

  cnh?: string;

  categoria_cnh?: string;

  salario?: number;

  status?: string;

}



export interface UpdateMotoristaDTO {

  nome?: string;

  cpf?: string;

  telefone?: string;

  cnh?: string;

  categoria_cnh?: string;

  salario?: number;

  status?: string;

}