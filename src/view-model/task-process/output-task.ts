import { Cadastro } from "../cadastro/cadastro";
import { Certification } from "../certification/certification";
import { Valids } from "../fulltest/validacao";
import { Ont } from "./ont";
import { Serial } from "./serial";
import { RespostaGenerica } from "../resposta/resposta-generica";
import { AtendimentoDigitalOutput, AtendimentoDigitalOututDetail } from "../atendimento-digital/atendimento-digital-output";
import { Device } from "../aprovisionamento/device";

export class Output {
    type: string;
    state: string;
    exceptionMessage: string;

    //Login Case
    match?: boolean;

    //Busca Cadastro Case
    instancia?: string;
    customer?: Cadastro;

    //Certification Case
    certification?: Certification;

    //Tab Rede Case
    tabRede?: Valids;

    //Onts Livres Case
    onts?: Ont[];

    //Set Serial Case
    serial?: Serial;

    resposta?: RespostaGenerica;

    // Config BHS GPON VIVO 1
    vlans?: Valids[];

    tickets?: AtendimentoDigitalOutput[];

    //Aprovisionamento
    devices?: Device[];

    atendimento: AtendimentoDigitalOututDetail;

}