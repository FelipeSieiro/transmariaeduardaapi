import { z } from "zod";



export const createMotoristaSchema = z.object({

  nome: z
    .string()
    .min(3, "Nome deve possuir no mínimo 3 caracteres"),


  cpf: z
    .string()
    .min(11, "CPF deve possuir 11 caracteres")
    .optional(),


  telefone: z
    .string()
    .optional(),


  cnh: z
    .string()
    .optional(),


  categoria_cnh: z
    .string()
    .optional(),


  salario: z
    .number()
    .positive("Salário deve ser maior que zero")
    .optional(),


  status: z
    .string()
    .optional(),

});





export const updateMotoristaSchema = z.object({

  nome: z
    .string()
    .min(3, "Nome deve possuir no mínimo 3 caracteres")
    .optional(),


  cpf: z
    .string()
    .min(11, "CPF deve possuir 11 caracteres")
    .optional(),


  telefone: z
    .string()
    .optional(),


  cnh: z
    .string()
    .optional(),


  categoria_cnh: z
    .string()
    .optional(),


  salario: z
    .number()
    .positive("Salário deve ser maior que zero")
    .optional(),


  status: z
    .string()
    .optional(),

});





export const updateStatusMotoristaSchema = z.object({

  status: z
    .enum([
      "ativo",
      "inativo",
      "ferias",
      "afastado",
    ]),

});