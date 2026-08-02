import { z } from "zod";



export const createRotaSchema = z.object({

  nome: z
    .string()
    .min(1, "Nome da rota é obrigatório"),


  descricao: z
    .string()
    .optional(),


  bairro: z
    .string()
    .optional(),


  horario_saida: z
    .string()
    .optional(),


  horario_retorno: z
    .string()
    .optional(),


  motorista_id: z
    .uuid()
    .optional(),


  veiculo_id: z
    .uuid()
    .optional(),


  status: z
    .string()
    .optional(),

});





export const updateRotaSchema = z.object({

  nome: z
    .string()
    .min(1)
    .optional(),


  descricao: z
    .string()
    .optional(),


  bairro: z
    .string()
    .optional(),


  horario_saida: z
    .string()
    .optional(),


  horario_retorno: z
    .string()
    .optional(),


  motorista_id: z
    .uuid()
    .optional()
    .nullable(),


  veiculo_id: z
    .uuid()
    .optional()
    .nullable(),


  status: z
    .string()
    .optional(),

});






export const updateRotaStatusSchema = z.object({

  status: z
    .string()
    .min(1, "Status obrigatório"),

});