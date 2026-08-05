import { VeiculosRepository } from "./veiculos.repository.js";

import type {
  CreateVeiculoDTO,
  UpdateVeiculoDTO,
} from "./veiculos.types.js";


export class VeiculosService {


  private repository: VeiculosRepository;



  constructor() {

    this.repository =
      new VeiculosRepository();

  }





  async findAll() {

    return this.repository.findAll();

  }






  async findById(
    id: string,
  ) {


    const veiculo =
      await this.repository.findById(id);



    if (!veiculo) {

      throw new Error(
        "Veículo não encontrado",
      );

    }


    return veiculo;

  }








  async create(
    payload: CreateVeiculoDTO,
  ) {


    const veiculos =
      await this.repository.findAll();



    const placaExiste =
      veiculos.some(
        (item) =>
          item.placa === payload.placa,
      );



    if (placaExiste) {

      throw new Error(
        "Já existe um veículo com essa placa",
      );

    }



    return this.repository.create(
      payload,
    );

  }









  async update(
    id: string,
    payload: UpdateVeiculoDTO,
  ) {


    await this.findById(id);



    return this.repository.update(
      id,
      payload,
    );

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









  async delete(
    id: string,
  ) {


    await this.findById(id);



    return this.repository.delete(
      id,
    );

  }


}