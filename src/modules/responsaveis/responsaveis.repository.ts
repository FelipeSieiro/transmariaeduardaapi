import { supabase } from "../../config/supabase.js";

import type {
  CreateResponsavelDTO,
  UpdateResponsavelDTO,
} from "./responsaveis.types.js";



export class ResponsaveisRepository {


  private readonly table =
    "responsaveis";







  async findAll() {


    const { data, error } =
      await supabase
        .from(this.table)
        .select("*")
        .is(
          "deleted_at",
          null,
        )
        .order(
          "created_at",
          {
            ascending: false,
          },
        );



    if (error) {

      throw error;

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

      throw error;

    }



    return data;

  }









  async create(
    payload: CreateResponsavelDTO,
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

      throw error;

    }



    return data;

  }









  async update(
    id: string,
    payload: UpdateResponsavelDTO,
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

      throw error;

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

      throw error;

    }



    return true;

  }


}