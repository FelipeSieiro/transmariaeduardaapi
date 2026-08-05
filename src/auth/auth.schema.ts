import { z } from "zod";

export const createUserSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve possuir no mínimo 3 caracteres"),

    email: z
        .string()
        .email("E-mail inválido")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(6, "Senha deve possuir no mínimo 6 caracteres"),

    perfil: z.string().optional()
});

export const loginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .transform((email) => email.toLowerCase()),

    password: z
        .string()
        .min(1, "Senha obrigatória")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;