import { RotasRepository } from "./rotas.repository";

import type {
  CreateRotaDTO,
  UpdateRotaDTO,
} from "./rotas.types";



export class RotasService {


  private repository: RotasRepository;



  constructor() {

    this.repository =
      new RotasRepository();

  }







  async findAll() {


    return this.repository.findAll();

  }









  async findById(
    id: string,
  ) {


    const rota =
      await this.repository.findById(
        id,
      );



    if (!rota) {

      throw new Error(
        "Rota não encontrada",
      );

    }


    return rota;

  }









  async create(
    payload: CreateRotaDTO,
  ) {



    const rotas =
      await this.repository.findAll();



    const rotaExiste =
      rotas.some(
        (item) =>
          item.nome
            .toLowerCase()
            ===
          payload.nome
            .toLowerCase(),
      );



    if (rotaExiste) {

      throw new Error(
        "Já existe uma rota com esse nome",
      );

    }




    return this.repository.create(
      payload,
    );

  }









  async update(
    id: string,
    payload: UpdateRotaDTO,
  ) {


    await this.findById(
      id,
    );



    return this.repository.update(
      id,
      payload,
    );

  }









  async updateStatus(
    id: string,
    status: string,
  ) {


    await this.findById(
      id,
    );



    return this.repository.updateStatus(
      id,
      status,
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