import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";
import { Certification } from "../../view-model/certification/certification";
import { Ont } from "../../view-model/task-process/ont";

@Injectable()
export class HolderService {

    public estalogado: boolean;

    public instancia: string;
    public cadastro: Cadastro;
    public certification: Certification;

    public tabCadastroAtivo: boolean = false;
    public tabFulltestAtivo: boolean = false;
    public tabHomeAtivo: boolean = true;

    public onts: Ont[];

    constructor() { }

}