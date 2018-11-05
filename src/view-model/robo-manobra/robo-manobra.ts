import { Primaria } from "./primaria";

export class RoboManobra {
    id_solicitacao?: string;
    statusPorta?: string = null;
    observacao?: string;
    primaria?: Primaria[];
}