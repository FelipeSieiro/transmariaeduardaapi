import { z } from "zod";


export const alunoResponsavelSchema = z.object({


  responsavel_id:

    z.string()
    .uuid(
      "Responsável inválido"
    ),



  parentesco:

    z.string()
    .optional(),



  responsavel_financeiro:

    z.boolean()
    .optional()
    .default(false),



  responsavel_emergencia:

    z.boolean()
    .optional()
    .default(false),



});









export const createAlunoSchema = z.object({



  matricula:

    z.string()
    .min(
      1,
      "Matrícula é obrigatória"
    ),





  nome:

    z.string()
    .min(
      1,
      "Nome é obrigatório"
    ),






  foto_url:

    z.string()
    .optional(),






  data_nascimento:

    z.string()
    .optional(),






  escola_id:

    z.string()
    .uuid(
      "Escola inválida"
    )
    .optional(),






  serie:

    z.string()
    .optional(),






  turno:

    z.string()
    .optional(),






  endereco:

    z.string()
    .optional(),






  numero:

    z.string()
    .optional(),






  complemento:

    z.string()
    .optional(),






  bairro:

    z.string()
    .optional(),






  cidade:

    z.string()
    .optional(),






  cep:

    z.string()
    .optional(),






  rota_id:

    z.string()
    .uuid(
      "Rota inválida"
    )
    .optional(),






  status:

    z.string()
    .optional(),






  data_inicio:

    z.string()
    .optional(),







  /**
   * Relacionamento aluno -> responsáveis
   */
  aluno_responsavel:

    z.array(
      alunoResponsavelSchema
    )
    .optional(),




});









export const updateAlunoSchema = z.object({



  nome:

    z.string()
    .min(
      1
    )
    .optional(),






  foto_url:

    z.string()
    .optional(),






  data_nascimento:

    z.string()
    .optional(),






  escola_id:

    z.string()
    .uuid()
    .optional(),






  serie:

    z.string()
    .optional(),






  turno:

    z.string()
    .optional(),






  endereco:

    z.string()
    .optional(),






  numero:

    z.string()
    .optional(),






  complemento:

    z.string()
    .optional(),






  bairro:

    z.string()
    .optional(),






  cidade:

    z.string()
    .optional(),






  cep:

    z.string()
    .optional(),






  rota_id:

    z.string()
    .uuid()
    .optional(),






  status:

    z.string()
    .optional(),






  data_inicio:

    z.string()
    .optional(),




});



export type CreateAlunoSchema =
  z.infer<typeof createAlunoSchema>;



export type UpdateAlunoSchema =
  z.infer<typeof updateAlunoSchema>;



export type AlunoResponsavelSchema =
  z.infer<typeof alunoResponsavelSchema>;