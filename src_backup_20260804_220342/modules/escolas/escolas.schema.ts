import { z } from "zod";


export const createEscolaSchema = z.object({
    nome: z
        .string({
            message: "Nome é obrigatório",
        })
        .min(3, "Nome deve possuir no mínimo 3 caracteres"),

    endereco: z
        .string()
        .optional(),

    telefone: z
        .string()
        .optional(),
});


export const updateEscolaSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve possuir no mínimo 3 caracteres")
        .optional(),

    endereco: z
        .string()
        .optional(),

    telefone: z
        .string()
        .optional(),
});


export type CreateEscolaSchema = z.infer<
    typeof createEscolaSchema
>;


export type UpdateEscolaSchema = z.infer<
    typeof updateEscolaSchema
>;