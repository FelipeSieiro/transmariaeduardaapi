import { EscolasRepository } from "./escolas.repository.js";

import type {
    CreateEscolaDTO,
    UpdateEscolaDTO,
} from "./escolas.types.js";


export class EscolasService {


    private repository: EscolasRepository;


    constructor() {
        this.repository = new EscolasRepository();
    }



    async findAll() {

        return await this.repository.findAll();

    }




    async findById(id: string) {


        const escola = await this.repository.findById(id);



        if (!escola) {
            throw new Error(
                "Escola não encontrada",
            );
        }



        return escola;

    }





    async create(
        payload: CreateEscolaDTO,
    ) {


        return await this.repository.create(
            payload,
        );

    }





    async update(
        id: string,
        payload: UpdateEscolaDTO,
    ) {



        const escola =
            await this.repository.findById(id);



        if (!escola) {

            throw new Error(
                "Escola não encontrada",
            );

        }



        return await this.repository.update(
            id,
            payload,
        );

    }






    async delete(id: string) {


        const escola =
            await this.repository.findById(id);



        if (!escola) {

            throw new Error(
                "Escola não encontrada",
            );

        }



        return await this.repository.delete(
            id,
        );

    }


}