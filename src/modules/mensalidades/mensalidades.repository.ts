import { supabase } from "../../config/supabase";
import type {
  CreateMensalidadeDTO,
  UpdateMensalidadeDTO,
  PagarMensalidadeDTO,
} from "./mensalidades.types";

export class MensalidadesRepository {
  // =====================================================
  // LISTAR TODAS
  // =====================================================
  async findAll() {
    const { data, error } = await supabase
      .from("mensalidades")
      .select("*")
      .is("deleted_at", null)
      .order("data_vencimento", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // =====================================================
  // BUSCAR POR ID
  // =====================================================
  async findById(id: string) {
    const { data, error } = await supabase
      .from("mensalidades")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  // =====================================================
  // BUSCAR POR CONTRATO (Sempre retorna Array)
  // =====================================================
  async findByContrato(contratoId: string) {
    const { data, error } = await supabase
      .from("mensalidades")
      .select("*")
      .eq("contrato_id", contratoId)
      .is("deleted_at", null)
      .order("data_vencimento", { ascending: true });

    if (error) throw error;
    return data || []; // Garante retorno de lista vazia sem erro
  }

  // =====================================================
  // CRIAR
  // =====================================================
  async create(payload: CreateMensalidadeDTO) {
    const { data, error } = await supabase
      .from("mensalidades")
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // =====================================================
  // ATUALIZAR
  // =====================================================
  async update(id: string, payload: UpdateMensalidadeDTO) {
    const { data, error } = await supabase
      .from("mensalidades")
      .update(payload)
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // =====================================================
  // REGISTRAR PAGAMENTO
  // =====================================================
  async pagar(id: string, payload: PagarMensalidadeDTO) {
    const { data, error } = await supabase
      .from("mensalidades")
      .update({
        status: "pago",
        forma_pagamento: payload.forma_pagamento,
        data_pagamento: payload.data_pagamento,
      })
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // =====================================================
  // SOFT DELETE
  // =====================================================
  async delete(id: string) {
    const { data, error } = await supabase
      .from("mensalidades")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}