import { z } from "zod";


export const createVeiculoSchema = z.object({

  placa: z
    .string()
    .min(1, "Placa é obrigatória")
    .max(10, "Placa inválida"),


  modelo: z
    .string()
    .optional(),


  marca: z
    .string()
    .optional(),


  ano: z
    .number()
    .int()
    .positive()
    .optional(),


  capacidade: z
    .number()
    .int()
    .positive()
    .optional(),


  motorista_id: z
    .uuid()
    .optional(),


  status: z
    .string()
    .optional(),

});


export const updateVeiculoSchema = z.object({

  placa: z
    .string()
    .min(1)
    .max(10)
    .optional(),


  modelo: z
    .string()
    .optional(),


  marca: z
    .string()
    .optional(),


  ano: z
    .number()
    .int()
    .positive()
    .optional(),


  capacidade: z
    .number()
    .int()
    .positive()
    .optional(),


  motorista_id: z
    .uuid()
    .optional()
    .nullable(),


  status: z
    .string()
    .optional(),

});


export const updateVeiculoStatusSchema = z.object({

  status: z
    .string()
    .min(1, "Status obrigatório"),

});