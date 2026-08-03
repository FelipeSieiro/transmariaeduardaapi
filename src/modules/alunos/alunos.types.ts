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







export interface CreateAlunoResponsavelDTO {


  responsavel_id: string;


  parentesco?: string;


  responsavel_financeiro?: boolean;


  responsavel_emergencia?: boolean;


}