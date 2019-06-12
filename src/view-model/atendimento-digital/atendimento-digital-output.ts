import { AtendimentoDigital } from "./atendimento-digital";

export class AtendimentoDigitalOutput {
    id: number;
    fkId: string;
    ss: string;
    instancia: string;
    motivo: string;
    descricao: string;
    queueTaskId: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

export class AtendimentoHold {
    atendimento: AtendimentoDigitalOututDetail;
    historico: AtendimentoDigitalOututDetail[];
}

export class AtendimentoDigitalOututDetail {
    id: number;
    atendimento: string;
    nomeContato: string;
    numeroContato: string;
    situacao: string;
    dataCriacao: string;
    dataAtualizacao: string;
    atendimentoInteracoes: Iteracao[];
    ticket: AtendimentoDigital;
    user: User;
    tecnico: User;
}

export class User {
    matricula: string;
    nome: string;
    id: number;
}

export class Iteracao {
    id: number;
    observacao: string;
    tecnico: User;
    user: User;
}