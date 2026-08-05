import { z } from "zod";

const optionalString = z
  .string()
  .transform((val) => (val.trim() === "" ? undefined : val))
  .nullish()
  .transform((val) => val ?? undefined);

export const createRotaSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome da rota é obrigatório"),

  descricao: optionalString,

  bairro: optionalString,

  horario_saida: optionalString,

  horario_retorno: optionalString,

  // REMOVIDO: campo 'tempo' não existe mais

  motorista_id: z
    .string()
    .uuid("ID do motorista inválido")
    .nullish()
    .transform((val) => val ?? undefined),

  veiculo_id: z
    .string()
    .uuid("ID do veículo inválido")
    .nullish()
    .transform((val) => val ?? undefined),

  escola_id: z
    .string()
    .uuid("ID da escola inválido")
    .nullish()
    .transform((val) => val ?? undefined),

  status: optionalString,
});

export const updateRotaSchema = createRotaSchema.partial();

export const updateRotaStatusSchema = z.object({
  status: z
    .string()
    .min(1, "Status obrigatório"),
});