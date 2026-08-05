import { z } from "zod";



export const createResponsavelSchema = z.object({


  nome: z
    .string()
    .min(
      1,
      "Nome é obrigatório",
    ),



  cpf: z
    .string()
    .optional(),



  telefone: z
    .string()
    .optional(),



  email: z
    .string()
    .email(
      "E-mail inválido",
    )
    .optional(),



  endereco: z
    .string()
    .optional(),



  observacoes: z
    .string()
    .optional(),


});







export const updateResponsavelSchema = z.object({


  nome: z
    .string()
    .min(
      1,
    )
    .optional(),



  cpf: z
    .string()
    .optional(),



  telefone: z
    .string()
    .optional(),



  email: z
    .string()
    .email(
      "E-mail inválido",
    )
    .optional(),



  endereco: z
    .string()
    .optional(),



  observacoes: z
    .string()
    .optional(),


});







export const updateResponsavelStatusSchema = z.object({


  status: z
    .string()
    .min(
      1,
      "Status obrigatório",
    ),


});