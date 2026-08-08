import { randomUUID } from "node:crypto";
import { AlunosRepository } from "./alunos.repository.js";
import type {
    CreateAlunoDTO,
    UpdateAlunoDTO,
    CreateAlunoResponsavelDTO,
    CreateAlunoCompletoDTO,
} from "./alunos.types.js";
import { supabase } from "../../config/supabase.js";

export class AlunosService {
    private repository: AlunosRepository;

    constructor() {
        this.repository = new AlunosRepository();
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findById(id: string) {
        const aluno = await this.repository.findById(id);

        if (!aluno) {
            throw new Error("Aluno não encontrado");
        }

        return aluno;
    }

    async create(payload: CreateAlunoDTO) {
        // 1. Se a matrícula NÃO foi informada, gera um UUID automático e atribui ao id e à matrícula
        if (!payload.matricula || payload.matricula.trim() === "") {
            const novoId = randomUUID();
            (payload as any).id = novoId; // Garante que o ID será o mesmo
            payload.matricula = novoId; // A matrícula passa a ser o mesmo UUID
        } else {
            // 2. Se a matrícula FOI informada manualmente, verifica se já existe no banco
            const { data: alunoExistente } = await supabase
                .from("alunos")
                .select("id")
                .eq("matricula", payload.matricula)
                .is("deleted_at", null)
                .maybeSingle();

            if (alunoExistente) {
                throw new Error("Matrícula já cadastrada");
            }
        }

        // Validações de Escola e Rota
        if (payload.escola_id) {
            const { data: escola } = await supabase
                .from("escolas")
                .select("id")
                .eq("id", payload.escola_id)
                .single();

            if (!escola) {
                throw new Error("Escola não encontrada");
            }
        }

        if (payload.rota_id) {
            const { data: rota } = await supabase
                .from("rotas")
                .select("id")
                .eq("id", payload.rota_id)
                .single();

            if (!rota) {
                throw new Error("Rota não encontrada");
            }
        }

        return this.repository.create(payload);
    }

    // =====================================================
    // CADASTRO COMPLETO (ALUNO + RESPONSÁVEIS + CONTRATO)
    // =====================================================
    async createCompleto(payload: CreateAlunoCompletoDTO) {
        try {
            console.log("Criando aluno...");
            const aluno = await this.create(payload.aluno);
            console.log("Aluno criado:", aluno.id);

            if (payload.responsaveis?.length) {
                console.log("Adicionando responsáveis...");

                for (const responsavel of payload.responsaveis) {
                    // Verifica se o responsável já existe pelo CPF
                    let responsavelId;
                    
                    if (responsavel.cpf) {
                        const { data: responsavelExistente } = await supabase
                            .from("responsaveis")
                            .select("id")
                            .eq("cpf", responsavel.cpf)
                            .is("deleted_at", null)
                            .maybeSingle();

                        if (responsavelExistente) {
                            responsavelId = responsavelExistente.id;
                            console.log("Responsável existente encontrado:", responsavelId);
                        }
                    }

                    // Se não encontrou pelo CPF, cria um novo
                    if (!responsavelId) {
                        const { data: novoResponsavel, error } = await supabase
                            .from("responsaveis")
                            .insert({
                                nome: responsavel.nome,
                                telefone: responsavel.telefone ?? null,
                                email: responsavel.email ?? null,
                                cpf: responsavel.cpf ?? null,
                                endereco: responsavel.endereco ?? null,
                                observacoes: responsavel.observacoes ?? null,
                            })
                            .select()
                            .single();

                        if (error) {
                            throw error;
                        }

                        responsavelId = novoResponsavel.id;
                        console.log("Novo responsável criado:", responsavelId);
                    }

                    await this.repository.addResponsavel(
                        aluno.id,
                        {
                            responsavel_id: responsavelId,
                            parentesco: responsavel.parentesco,
                            responsavel_financeiro: responsavel.responsavel_financeiro,
                            responsavel_emergencia: responsavel.responsavel_emergencia,
                        }
                    );
                }

                console.log("Responsáveis adicionados");
            }

            if (payload.contrato) {
                console.log("Criando contrato...");

                const { error } = await supabase
                    .from("contratos")
                    .insert({
                        aluno_id: aluno.id,
                        numero: payload.contrato.numero,
                        data_inicio: payload.contrato.data_inicio,
                        data_fim: payload.contrato.data_fim ?? null,
                        valor_mensalidade:
                            payload.contrato.valor_mensalidade ?? 0,
                        dia_vencimento:
                            payload.contrato.dia_vencimento ?? 0,
                        forma_pagamento:
                            payload.contrato.forma_pagamento,
                        observacoes:
                            payload.contrato.observacoes,
                        status:
                            payload.contrato.status ?? "ativo",
                    });

                if (error) {
                    console.error(error);
                    throw error;
                }

                console.log("Contrato criado");
            }

            return this.repository.findById(aluno.id);
        } catch (error) {
            console.error("ERRO createCompleto");
            console.dir(error, { depth: null });
            throw error;
        }
    }

    async update(id: string, payload: UpdateAlunoDTO) {
        await this.findById(id);
        return this.repository.update(id, payload);
    }

    async delete(id: string) {
        await this.findById(id);
        return this.repository.delete(id);
    }

    async addResponsavel(alunoId: string, payload: CreateAlunoResponsavelDTO) {
        await this.findById(alunoId);
        return this.repository.addResponsavel(alunoId, payload);
    }

    // =====================================================
    // AGENDAMENTOS DE ROTAS DO ALUNO
    // =====================================================

    async getAgendamentosRotas(alunoId: string) {
        await this.findById(alunoId);

        // Consulta na tabela aluno_rotas (ou aluno_agendamento_rotas)
        const { data, error } = await supabase
            .from("aluno_rotas")
            .select("*")
            .eq("aluno_id", alunoId);

        if (error) {
            throw new Error("Erro ao buscar agendamentos de rotas: " + error.message);
        }

        return data ?? [];
    }

    async syncAgendamentosRotas(alunoId: string, payload: any) {
        await this.findById(alunoId);

        // 1. Limpa os agendamentos anteriores do aluno
        const { error: deleteError } = await supabase
            .from("aluno_rotas")
            .delete()
            .eq("aluno_id", alunoId);

        if (deleteError) {
            throw new Error("Erro ao limpar agendamentos anteriores: " + deleteError.message);
        }

        // 2. Insere os novos agendamentos recebidos
        const novosAgendamentos = Array.isArray(payload) ? payload : payload?.agendamentos ?? [];

        if (novosAgendamentos.length > 0) {
            const registros = novosAgendamentos.map((item: any) => ({
                aluno_id: alunoId,
                rota_id: item.rota_id,
                dia_semana: item.dia_semana,
                tipo_trajeto: item.tipo_trajeto,
                horario: item.horario,
            }));

            const { data, error: insertError } = await supabase
                .from("aluno_rotas")
                .insert(registros)
                .select();

            if (insertError) {
                throw new Error("Erro ao salvar novos agendamentos: " + insertError.message);
            }

            return data;
        }

        return [];
    }
}