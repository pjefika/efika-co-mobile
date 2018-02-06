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
                validado = this.filterValid(conectividade, valids);
                break;
            case "PERFORMANCE":
                let performance: string[];
                performance = ["Confiabilidade de Rede"];
                validado = this.filterValid(performance, valids);
                break;
            case "SERVICOS":
                let servicos: string[];
                servicos = ["Vlan Banda Larga", "Vlan VoIP", "Vlan VoD/IPTV", "Profile"];
                validado = this.filterValid(servicos, valids);
                break;
            case "CADASTRO":
                validado = false;
                break;
        }
        return validado;
    }


    private filterValid(info: string[], valids: Valids[]): boolean {
        let val = false;
        let fil: number;
        valids.filter(valid => {
            fil = info.indexOf(valid.nome);
            if (fil > -1) {
                val = true;
            }
        });
        return val;
    }

}