export interface Contrato {

  id:string;

  aluno_id:string;

  numero:string;

  data_inicio:string;

  data_fim?:string | null;

  valor_mensalidade:number;

  dia_vencimento:number;

  forma_pagamento?:string | null;

  observacoes?:string | null;

  status?:string | null;

  created_at?:string;

  updated_at?:string;

}



export type CreateContratoDTO = {


  aluno_id:string;


  numero:string;


  data_inicio:string;


  data_fim?:string | null;


  valor_mensalidade:number;


  dia_vencimento:number;


  forma_pagamento?:string | null;


  observacoes?:string | null;


  status?:string | null;


};



export type UpdateContratoDTO = Partial<CreateContratoDTO>;