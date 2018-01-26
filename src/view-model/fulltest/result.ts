export class Result {
    //Padrão
    nome: string;
    type: string;

    //[1]
    adminState?: boolean;
    operState?: boolean;

    //[2]
    serial?: string;
    slot?: number;
    porta?: number;
    idOnt?: number;

    //[3]
    potOnt?: number
    potOlt?: number

    //[4]
    profileUp?: string;
    profileDown?: string;
    down?: string;
    up?: string;

    //[5]
    cvlan?: number;
    svlan?: number;
    pctDown?: number;
    pctUp?: number;
    state?: string;

    //[6]
    mac?: string;

    //[7]
    snrDown?: number;
    snrUp?: number;
    atnDown?: number;
    atnUp?: number;
    velSincDown?: number;
    velSincUp?: number;
    velMaxDown?: number;
    velMaxUp?: number;
    snrDown1?: number;
    snrDown2?: number;
    snrUp1?: number;
    snrUp2?: number;
    atnDown1?: number;
    atnDown2?: number;
    atnUp1?: number;
    atnUp2?: number;
}