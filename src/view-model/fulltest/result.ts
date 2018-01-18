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
    cvlan?: number
    svlan?: number
    pctDown?: number
    pctUp?: number
    state?: string;

    //[6]
    mac?: string;
}