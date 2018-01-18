import { Cadastro } from "../cadastro/cadastro";
import { ObjectValid } from "../fulltest/objectValid";

export class Output {
    type: string;
    state: string;
    exceptionMessage: string;

    //Login Case
    match?: boolean;

    //Busca Cadastro Case
    instancia?: string;
    customer?: Cadastro;

    //Certification Case
    objectValid: ObjectValid

}