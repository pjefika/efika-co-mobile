import { Action } from "./mural-action";

export class InfoMural {
    titulo: string;
    mensagem: string;
    data_inicio: number;
    data_fim: number;
    action?: Action;
}