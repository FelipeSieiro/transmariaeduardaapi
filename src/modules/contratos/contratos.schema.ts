import { z } from "zod";



export const createContratoSchema = z.object({

  aluno_id:
    z.string().uuid(),


  numero:
    z.string().min(1),


  data_inicio:
    z.string(),


  data_fim:
    z.string()
      .nullable()
      .optional(),



  valor_mensalidade:
    z.number(),



  dia_vencimento:
    z.number()
      .min(1)
      .max(31),



  forma_pagamento:
    z.string()
      .nullable()
      .optional(),



  observacoes:
    z.string()
      .nullable()
      .optional(),



  status:
    z.string()
      .optional()

});





export const updateContratoSchema =
  createContratoSchema.partial();