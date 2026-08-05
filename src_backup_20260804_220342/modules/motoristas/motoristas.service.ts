import { MotoristasRepository } from "./motoristas.repository";

import type {
  CreateMotoristaDTO,
  UpdateMotoristaDTO,
} from "./motoristas.types";



export class MotoristasService {


  private repository: MotoristasRepository;



  constructor() {

    this.repository =
      new MotoristasRepository();

  }






  async findAll() {

    return this.repository.findAll();

  }








  async findById(
    id: string,
  ) {


    const motorista =
      await this.repository.findById(id);



    if (!motorista) {

      throw new Error(
        "Motorista não encontrado",
      );

    }



    return motorista;

  }









  async create(
    payload: CreateMotoristaDTO,
  ) {



    const motorista =
      await this.repository.create(
        {
          ...payload,

          status:
            payload.status ??
            "ativo",
        },
      );



    return motorista;

  }









  async update(
    id: string,
    payload: UpdateMotoristaDTO,
  ) {



    await this.findById(id);



    const motorista =
      await this.repository.update(
        id,
        payload,
      );



    return motorista;

  }









  async delete(
    id: string,
  ) {


    await this.findById(id);



    await this.repository.delete(
      id,
    );


    return true;

  }









  async updateStatus(
    id: string,
    status: string,
  ) {


    await this.findById(id);



    return this.repository.updateStatus(
      id,
      status,
    );

  }


}