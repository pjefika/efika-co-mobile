import { Cadastro } from "../cadastro/cadastro";

export class Input {
    type: string;

    //Login Case
    login?: string;
    senha?: string;

    //Busca Cadastro Case
    instancia?: string;

    //Certification Case
    cadastro?: Cadastro;
}