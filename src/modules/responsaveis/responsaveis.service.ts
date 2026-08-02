import { ResponsaveisRepository } from "./responsaveis.repository";

import type {
  CreateResponsavelDTO,
  UpdateResponsavelDTO,
} from "./responsaveis.types";



export class ResponsaveisService {


  private repository: ResponsaveisRepository;



  constructor() {

    this.repository =
      new ResponsaveisRepository();

  }







  async findAll() {

    return this.repository.findAll();

  }









  async findById(
    id: string,
  ) {


    const responsavel =
      await this.repository.findById(
        id,
      );



    if (!responsavel) {

      throw new Error(
        "Responsável não encontrado",
      );

    }



    return responsavel;

  }









  async create(
    payload: CreateResponsavelDTO,
  ) {



    const responsaveis =
      await this.repository.findAll();



    if (payload.cpf) {


      const existe =
        responsaveis.some(
          (item) =>
            item.cpf === payload.cpf,
        );



      if (existe) {

        throw new Error(
          "CPF já cadastrado",
        );

      }

    }






    return this.repository.create(
      payload,
    );

  }









  async update(
    id: string,
    payload: UpdateResponsavelDTO,
  ) {


    await this.findById(
      id,
    );



    return this.repository.update(
      id,
      payload,
    );

  }









  async delete(
    id: string,
  ) {


    await this.findById(
      id,
    );



    return this.repository.delete(
      id,
    );

  }


}