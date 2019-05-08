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
    modeloHG: string;
    macHG: string;

    // Ativação VOIP - 1
    chkATA?: boolean;

    // Ativação TV - 2
    chkModelo?: boolean;

    pontos: AddPontos[] = [];

}

export class AddPontos {

    mac: string;
    serial: string;
    modeloAta?: string;

}

export class ReOpenAntendimentoDigital {
    tecnico: number;
    user: number;
    atendimento: number;
    observacao: string;
}