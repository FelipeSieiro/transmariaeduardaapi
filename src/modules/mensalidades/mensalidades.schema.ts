import { z } from "zod";



// ======================================================
// STATUS DA MENSALIDADE
// ======================================================

export const statusMensalidadeSchema = z.enum([

  "pendente",

  "pago",

  "atrasado",

  "cancelado",

]);








// ======================================================
// FORMAS DE PAGAMENTO
// ======================================================

export const formaPagamentoSchema = z.enum([

  "PIX",

  "Dinheiro",

  "Cartão",

  "Boleto",

  "Transferência",

]);









// ======================================================
// CRIAR MENSALIDADE
// POST /mensalidades
// ======================================================

export const createMensalidadeSchema = z.object({



  contrato_id:

    z.string()

    .uuid(

      "Contrato inválido"

    ),






  competencia:

    z.string()

    .min(

      1,

      "Competência obrigatória"

    ),






  valor:

    z.number()

    .positive(

      "Valor deve ser maior que zero"

    ),






  data_vencimento:

    z.string()

    .min(

      1,

      "Data de vencimento obrigatória"

    ),






  status:

    statusMensalidadeSchema

    .optional()

    .default(

      "pendente"

    ),






  observacoes:

    z.string()

    .optional(),


});









// ======================================================
// ATUALIZAR MENSALIDADE
// PUT /mensalidades/:id
// ======================================================

export const updateMensalidadeSchema = z.object({



  competencia:

    z.string()

    .optional(),






  valor:

    z.number()

    .positive()

    .optional(),






  data_vencimento:

    z.string()

    .optional(),






  status:

    statusMensalidadeSchema

    .optional(),






  data_pagamento:

    z.string()

    .nullable()

    .optional(),






  forma_pagamento:

    formaPagamentoSchema

    .nullable()

    .optional(),






  observacoes:

    z.string()

    .nullable()

    .optional(),


});









// ======================================================
// REGISTRAR PAGAMENTO
// POST /mensalidades/:id/pagar
// ======================================================

export const pagarMensalidadeSchema = z.object({



  data_pagamento:

    z.string()

    .min(

      1,

      "Data do pagamento obrigatória"

    ),






  forma_pagamento:

    formaPagamentoSchema,






  observacoes:

    z.string()

    .optional(),


});









// ======================================================
// GERAÇÃO AUTOMÁTICA
// Será usada depois pelo contrato
// ======================================================

export const gerarMensalidadesSchema = z.object({



  contrato_id:

    z.string()

    .uuid(

      "Contrato inválido"

    ),






  quantidade:

    z.number()

    .int()

    .positive()

    .default(

      12

    ),


});









// ======================================================
// TYPES INFERIDOS
// ======================================================

export type CreateMensalidadeSchema =

  z.infer<

    typeof createMensalidadeSchema

  >;





export type UpdateMensalidadeSchema =

  z.infer<

    typeof updateMensalidadeSchema

  >;





export type PagarMensalidadeSchema =

  z.infer<

    typeof pagarMensalidadeSchema

  >;





export type GerarMensalidadesSchema =

  z.infer<

    typeof gerarMensalidadesSchema

  >;