

import { supabase } from "../../config/supabase";
import type {
  CreateMotoristaDTO,
  UpdateMotoristaDTO,
} from "./motoristas.types";



export class MotoristasRepository {


  private table = "motoristas";



  async findAll() {


    const { data, error } =
      await supabase
        .from(this.table)
        .select("*")
        .is("deleted_at", null)
        .order(
          "nome",
          {
            ascending: true,
          },
        );



    if (error) {
      throw new Error(error.message);
    }


    return data;

  }






  async findById(
    id: string,
  ) {


    const { data, error } =
      await supabase
        .from(this.table)
        .select("*")
        .eq(
          "id",
          id,
        )
        .is(
          "deleted_at",
          null,
        )
        .single();



    if (error) {
      throw new Error(error.message);
    }


    return data;

  }








  async create(
    payload: CreateMotoristaDTO,
  ) {


    const { data, error } =
      await supabase
        .from(this.table)
        .insert(
          payload,
        )
        .select()
        .single();



    if (error) {
      throw new Error(error.message);
    }


    return data;

  }








  async update(
    id: string,
    payload: UpdateMotoristaDTO,
  ) {


    const { data, error } =
      await supabase
        .from(this.table)
        .update(
          payload,
        )
        .eq(
          "id",
          id,
        )
        .select()
        .single();



    if (error) {
      throw new Error(error.message);
    }


    return data;

  }









  async delete(
    id: string,
  ) {


    const { error } =
      await supabase
        .from(this.table)
        .update({
          deleted_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "id",
          id,
        );



    if (error) {
      throw new Error(error.message);
    }


    return true;

  }








  async updateStatus(
    id: string,
    status: string,
  ) {


    const { data, error } =
      await supabase
        .from(this.table)
        .update({
          status,
        })
        .eq(
          "id",
          id,
        )
        .select()
        .single();



    if (error) {
      throw new Error(error.message);
    }


    return data;

  }


}