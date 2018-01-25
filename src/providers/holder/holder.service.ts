import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";
import { ObjectValid } from "../../view-model/fulltest/objectValid";
import { Certification } from "../../view-model/certification/certification";

@Injectable()
export class HolderService {

    public estalogado: boolean;

    public instancia: string;
    public cadastro: Cadastro;
    public objectValid: ObjectValid;

    public certification: Certification;

    constructor() { }

}