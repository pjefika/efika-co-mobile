export class AtendimentoDigital {

    instancia: string;
    fkId: string;
    ss: string;
    motivo: string;

    nomeTecnico: string;
    matriculaTecnico: string;
    telefoneTecnico: string;
    emailTecnico: string;

    //Global para 1 & 2
    macHG: string;
    serialHG: string;

    // Ativação VOIP - 1
    chkATA?: boolean;

    // Ativação TV - 2
    tipoTV?: string;
    modeloTV?: string;
    detailIPTV?: string;

    pontos: AddPontos[] = [];

}

export class AddPontos {

    mac: string;
    serial: string;
    modeloAta?: number;

    caId?: string;
    smartCard?: string;

}

export class ReOpenAntendimentoDigital {
    tecnico: number;
    user: number;
    atendimento: number;
    observacao: string;
}