// =====================================================
// ENTIDADE MENSALIDADE
// Representa a tabela mensalidades
// =====================================================


export interface Mensalidade {


  id: string;



  contrato_id: string;



  competencia: string;



  valor: number;



  data_vencimento: string;



  status?: string | null;



  data_pagamento?: string | null;



  forma_pagamento?: string | null;



  observacoes?: string | null;



  created_at?: string;



  updated_at?: string;



  deleted_at?: string | null;


}









// =====================================================
// CRIAÇÃO DE MENSALIDADE
// =====================================================


export interface CreateMensalidadeDTO {


  contrato_id: string;



  competencia: string;



  valor: number;



  data_vencimento: string;



  status?: string;



  data_pagamento?: string | null;



  forma_pagamento?: string | null;



  observacoes?: string | null;


}









// =====================================================
// ATUALIZAÇÃO DE MENSALIDADE
// =====================================================


export interface UpdateMensalidadeDTO {


  competencia?: string;



  valor?: number;



  data_vencimento?: string;



  status?: string;



  data_pagamento?: string | null;



  forma_pagamento?: string | null;



  observacoes?: string | null;


}









// =====================================================
// PAGAMENTO DE MENSALIDADE
// Usado pelo endpoint /:id/pagar
// =====================================================


export interface PagarMensalidadeDTO {


  data_pagamento: string;



  forma_pagamento: string;



  observacoes?: string | null;


}