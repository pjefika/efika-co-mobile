import { Action } from "./mural-action";

export class InfoMural {
    id: string;
    titulo: string;
    mensagem: string;
    data_inicio: Date;
    data_fim: Date;
    responsavel: string;
    action?: Action;
    tipo: string;
}