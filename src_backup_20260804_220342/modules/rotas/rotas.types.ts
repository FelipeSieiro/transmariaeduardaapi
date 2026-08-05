export interface Rota {

  id: string;

  nome: string;

  descricao?: string | null;

  bairro?: string | null;

  horario_saida?: string | null;

  horario_retorno?: string | null;

  motorista_id?: string | null;

  veiculo_id?: string | null;

  status?: string | null;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;

}



export interface CreateRotaDTO {

  nome: string;

  descricao?: string;

  bairro?: string;

  horario_saida?: string;

  horario_retorno?: string;

  motorista_id?: string;

  veiculo_id?: string;

  status?: string;

}



export interface UpdateRotaDTO {

  nome?: string;

  descricao?: string;

  bairro?: string;

  horario_saida?: string;

  horario_retorno?: string;

  motorista_id?: string;

  veiculo_id?: string;

  status?: string;

}