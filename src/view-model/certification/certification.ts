import { Blocks } from "./blocks";
import { Cadastro } from "../cadastro/cadastro";
import { ObjectValid } from "../fulltest/objectValid";

export class Certification {
    resultado: string;
    orientacao: string;
    id: string;
    blocks: Blocks[];
    dataInicio: number;
    dataFim: number;
    customer: Cadastro;
    executor: string;
    fulltest: ObjectValid;
}