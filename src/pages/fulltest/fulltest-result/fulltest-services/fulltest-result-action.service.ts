import { Injectable } from '@angular/core';
import { Valids } from '../../../../view-model/fulltest/validacao';

@Injectable()
export class FulltestResultActionService {

    constructor() { }

    public validaInfoInsideBlocks(info: string, valids: Valids[]): boolean {
        let validado: boolean = false;
        switch (info) {
            case "CONECTIVIDADE":
                let conectividade: string[];
                conectividade = ["Parâmetros", "Parâmetros Ópticos",
                    "Estado Operacional da Porta", "Estado Administrativo da Porta",
                    "Associação Serial ONT", "Modulação", "MAC do Equipamento"];
                if (valids.filter(valid => conectividade.indexOf(valid.nome)).length > 0) {
                    validado = true;
                }
                break;
            case "PERFORMANCE":
                let performance: string[];
                performance = ["Confiabilidade de Rede"];
                if (valids.filter(valid => performance.indexOf(valid.nome)).length > 0) {
                    validado = true;
                }
                break;
            case "SERVICOS":
                let servicos: string[];
                servicos = ["Vlan Banda Larga", "Vlan VoIP", "Vlan VoD/IPTV", "Profile"];
                if (valids.filter(valid => servicos.indexOf(valid.nome)).length > 0) {
                    validado = true;
                }
                break;
            case "CADASTRO":
                validado = false;
                break;
        }
        return validado;
    }

}