export interface Veiculo {
  id: string;

  placa: string;

  modelo?: string | null;

  marca?: string | null;

  ano?: number | null;

  capacidade?: number | null;

  motorista_id?: string | null;

  status?: string | null;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;
}


export interface CreateVeiculoDTO {

  placa: string;

  modelo?: string;

  marca?: string;

  ano?: number;

  capacidade?: number;

  motorista_id?: string;

  status?: string;

}


export interface UpdateVeiculoDTO {

  placa?: string;

  modelo?: string;

  marca?: string;

  ano?: number;

  capacidade?: number;

  motorista_id?: string;

  status?: string;

}