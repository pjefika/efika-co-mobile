export class AtendimentoDigital {

    instancia: string;
    fkId: string;
    ss: string;
    motivo: string;

    tipo: string;
    tipoEquipamento: string;
    situacao: string;
    descricao: string;
    queueTaskId: string;
    mac: string;
    serial: string;

    chkATA: boolean;

    detailIPTV: string;

    tecnologiaTV: string;

    tipoTV: string;


    // tecnico
    nomeTecnico: string;
    matriculaTecnico: string;
    telefoneTecnico: string;
    emailTecnico: string;

    pontos: AddPontos[] = [];

    erroTV: string;

}

export class AddPontos {

    mac: string;
    serial: string;

    tipoEquipamento?: string;

    caId?: string;
    smartCard?: string;

}

export class ReOpenAntendimentoDigital {
    tecnico: number;
    user: number;
    atendimento: number;
    observacao: string;
}