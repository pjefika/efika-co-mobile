import { Injectable } from '@angular/core';
import { UrlService } from '../../providers/url-service/url.service';
import { SuperService } from '../../providers/super-service/super.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';
import { ObjectValid } from '../../view-model/fulltest/objectValid';

@Injectable()
export class FulltestService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public doFulltest(cadastro: Cadastro) {
        let _data: { cust: Cadastro, executor: string };
        _data = { cust: cadastro, executor: "ionicTest" };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathFulltestAPI + "fulltest/co/", // co -- corrective
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as ObjectValid
            })
            .catch(super.handleError);
    }

    public getValidacaoMock(): ObjectValid {
        return JSON.parse('{"valids":[ { "nome":"Estado Administrativo da Porta", "mensagem":"Porta Ativada (Adm state Up).", "resultado":true, "foiCorrigido":false, "result":{ "adminState":true, "operState":true, "nome":"Estado da Porta" } }, { "nome":"Estado Operacional da Porta", "mensagem":"Sincronismo OK.", "resultado":true, "result":{ "adminState":true, "operState":true, "nome":"Estado da Porta" } }, { "nome":"Parâmetros", "mensagem":"Parâmetros dentro dos padrões.", "resultado":true, "result":{ "snrDown1":12.4, "snrDown2":12.4, "snrUp1":21.6, "snrUp2":19.5, "atnDown1":29.6, "atnDown2":47.5, "atnUp1":23.2, "atnUp2":35.4, "snrDown":12.4, "snrUp":21.9, "atnDown":12.8, "atnUp":1.7, "velSincDown":54996.0, "velSincUp":6000.0, "velMaxDown":87460.0, "velMaxUp":23388.0 } }, { "nome":"Confiabilidade de Rede", "mensagem":"Rede confiável.", "resultado":false, "foiCorrigido":true, "result":{ "pctDown":91109914, "pctUp":226779132, "crcDown":6, "crcUp":87, "fecDown":165, "fecUp":26976, "resync":0, "tempoMedicao":6026810,"crcOk": true,"pctSuficiente": true } }, { "nome":"Modulação", "mensagem":"Modulação configurada corretamente.", "resultado":true, "foiCorrigido":false, "result":{ "modulacao":"VDSL_17A_B8_12_SUV", "modulEnum":"VDSL", "nome":"Modulação" } }, { "nome":"Profile", "mensagem":"Profile configurado corretamente.", "resultado":true, "foiCorrigido":false, "result":{ "profileUp":"5", "profileDown":"50", "down":"VEL_51200", "up":"VEL_5120", "nome":"Profile" } }, { "nome":"Vlan Banda Larga", "mensagem":"Vlan de Banda configurado corretamente.", "resultado":true, "foiCorrigido":false, "result":{ "cvlan":1115, "svlan":478, "state":"UP" } }, { "nome":"Vlan VoIP", "mensagem":"Cliente sem VoIP.", "resultado":true, "foiCorrigido":false }, { "nome":"Vlan VoD/IPTV", "mensagem":"Cliente sem TV.", "resultado":true, "foiCorrigido":false }, { "nome":"Vlan Multicast", "mensagem":"Cliente sem TV.", "resultado":true, "foiCorrigido":false }, { "nome":"MAC do Equipamento", "mensagem":"Mac identificado 84:E0:58:0F:79:08.", "resultado":true, "result":{ "mac":"84:E0:58:0F:79:08", "nome":"MAC do Equipamento" } } ], "resultado":true, "dataInicio":{ "year":2017, "month":11, "dayOfMonth":8, "hourOfDay":16, "minute":48, "second":1 }, "dataFim":{ "year":2017, "month":11, "dayOfMonth":8, "hourOfDay":16, "minute":48, "second":47 }, "mensagem":"Não foram identificados problemas de configuração. Se o problema/sintoma informado pelo cliente persiste, seguir o fluxo." }');
    }

}