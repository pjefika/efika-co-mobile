export class AtendimentoDigital {

    instancia: string;
    fkId: string;
    ss: string;
    motivo: string;

    nomeTecnico: string;
    matriculaTecnico: string;
    telefoneTecnico: string;
    emailTecnico: string;

    infos?: AtendimentoDigitalModel;

}


export class AtendimentoDigitalModel {

    //Global para 1 & 2
    modeloHG: string;
    macHG: string;

    // Ativação VOIP - 1
    chkATA?: string;
    modeloATA?: string;
    macATA?: string;
    serialATA?: string;

    // Ativação TV - 2
    chkTVH?: string;
    lsIPTV?: string;
    ptIPTV?: string;
    lsTVH?: string;
    ptTVH?: string;
}