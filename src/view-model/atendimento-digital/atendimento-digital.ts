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
    modeloATA?: string;
    macATA?: string;
    serialATA?: string;

    // Ativação TV - 2
    chkTVH?: boolean;
    lsIPTV?: string;
    ptIPTV?: string;
    lsTVH?: string;
    ptTVH?: string;

}

export class ReOpenAntendimentoDigital {
    tecnico: number;
    user: number;
    atendimento: number;
    observacao: string;
}