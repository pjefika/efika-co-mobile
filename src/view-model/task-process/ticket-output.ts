export class Tickets {
    ata: Ata
    attendances: Attendances
    creationDate: Date
    customer: Customer
    id: string
    lastModifiedDate: Date
    leType: string
    modem: Modem
    multipleLines: boolean
    reason: Reason
    responsibleLogin: string
    ss: string
    status: { 
        beautyName: any, 
        name: string 
    }
    tecNote: null
    technician: Technician
    type: string
}

export class Ata {
    fabricante: string
    id: string
    mac: string
    modelo: null
    serial: string
    tecnologia: string
    tipo: string
}

export class Attendances {
    login: string
    note: string
    tecAnswer: string
    startDate: Date
    endDate: Date
    tecAnswerDate: Date
    closure: any
}

export class Customer {
    designador: string
    instancia: string
    designadorAcesso: string
    designadorTv: string
    rede: RedeModel
    redeExterna: RedeExterna
    servicos: Servicos
    linha: Linha
    radius: Radius
    asserts: Asserts[]
    eventos: Eventos[]
}

export class RedeModel {
    tipo: string
    origem: string
    planta: string
    ipDslam: string
    vendorDslam: string
    modeloDslam: string
    idOnt: string
    terminal: string
    ipMulticast: string
    nrc: string
    slot: number
    porta: number
    sequencial: number
    logica: number
    rin: number
    vlanVoip: number
    vlanVod: number
    vlanMulticast: number
    cvlan: number
    bhs: boolean
}

export class RedeExterna {
    tipo: string
    origem: string
    planta: string
    splitter1n: string
    splitter2n: string
    caboAlim: string
    fibra1n: string
    fibra2n: string
}

export class Servicos {
    origem: string
    velDown: number
    velUp: number
    tipoTv: string
    plataformaTv: string
    tipoLinha: string
    devices: Devices[]
}

export class Devices {
        mac: string
        serial: string
        tecnologia: string
        modelo: string
        fabricante: string
        tipo: string
        id: number
}

export class Linha {
    tipo: string
    dn: string
    central: string
}

export class Radius {
    status: string
    armario: string
    rin: string
    velocidade: string
    ipFixo: string
    profile: string
    porta: string
    isIpFixo: boolean
}

export class Asserts {
    asserts: string
    value: boolean
    creationDate: Date
}

export class Eventos {
    tipoAlarme: string
    tipoFalha: string
    tipoAfetacao: string
    desc: string
    dataAbertura: Date
    dataPrevista: Date
    numeroEvento: number
    tipoEvento: string
}
export class Modem {
    mac: string
    serial: string
    tecnologia: string
    modelo: string
    fabricante: string
    tipo: string
    id: number
}

export class Reason {
    id: string
    ownerLogin: string
    name: string
    description: string
    creationDate: Date
    lastModifiedDate: Date
    ticketType: string
    type: string
    active: boolean
}

export class Technician {
    name: string
    login: string
    phone: string
    email: string
}