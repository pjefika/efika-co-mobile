import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";
import { ObjectValid } from "../../view-model/fulltest/objectValid";

@Injectable()
export class HolderService {

    public instancia: string;
    public cadastro: Cadastro;
    public objectValid: ObjectValid;

    constructor() { }

}