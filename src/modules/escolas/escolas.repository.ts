import { supabase } from "../../config/supabase.js";

import type {
  CreateEscolaDTO,
  UpdateEscolaDTO,
} from "./escolas.types.js";


const TABLE = "escolas";


export class EscolasRepository {


  async findAll() {

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .is("deleted_at", null)
      .order("nome", {
        ascending: true,
      });


    if (error) {
      throw new Error(error.message);
    }


    return data;
  }



  async findById(id: string) {

    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();


    if (error) {
      throw new Error(error.message);
    }


    return data;
  }




  async create(payload: CreateEscolaDTO) {


    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select()
      .single();


    if (error) {
      throw new Error(error.message);
    }


    return data;
  }




  async update(
    id: string,
    payload: UpdateEscolaDTO,
  ) {


    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq("id", id)
      .select()
      .single();


    if (error) {
      throw new Error(error.message);
    }


    return data;
  }




  async delete(id: string) {


    const { error } = await supabase
      .from(TABLE)
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);



    if (error) {
      throw new Error(error.message);
    }


    return true;
  }


}