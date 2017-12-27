import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";

@Injectable()
export class HolderService {

    public instancia: string;
    public cadastro: Cadastro;

    constructor() { }

}