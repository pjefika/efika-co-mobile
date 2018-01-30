import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { FulltestService } from './fulltest.service';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    providers: [FulltestService]
})

export class FulltestComponent extends SuperComponentService implements OnInit {

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        private fulltestService: FulltestService,
        public navCtrl: NavController,
        public alertCtrl: AlertController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public fazFulltest() {
        let carregando = this.loadingCtrl.create({
            content: "Realizando Fulltest"
        });
        carregando.present();
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {
                if (super.validState(response.output)) {
                    this.holderService.certification = response.output.certification;
                    this.navCtrl.parent.select(1);
                }
            }, error => {
                super.showAlert("Ops, ocorreu algo.", "Fulltest não realizado.");
                console.log("Deu erro!!! AMD p(o.o)q");
            })
            .then(() => {
                carregando.dismiss();
            });
    }

    public fazFulltestMock() {
        //GPON
        this.holderService.certification = JSON.parse('{"resultado":"OK","orientacao":"OK","id":"5a709d57cb66bf27f798384f","blocks":[{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Não há bloqueio no Radius.","nome":"HAS_BLOQ_RADIUS"},{"resultado":"OK","orientacao":"Radius e Inventário de Rede OK.","nome":"IS_INV_REDE_EQUALS_RADIUS"},{"resultado":"OK","orientacao":"Inventário de Rede OK.","nome":"HAS_INV_REDE"},{"resultado":"OK","orientacao":"Inventário de Serviços OK.","nome":"HAS_INV_SERV"}],"nome":"CADASTRO"},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Vlan de Banda configurado corretamente.Vlan de VoIP configurado corretamente.","nome":"IS_VLANS_OK"},{"resultado":"OK","orientacao":"Profile configurado corretamente.","nome":"IS_PROFILE_OK"}],"nome":"SERVICOS"},{"resultado":"OK","orientacao":"OK","asserts":[],"nome":"PERFORMANCE"},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Porta Ativada (Adm state Up).","nome":"IS_ADM_UP"},{"resultado":"OK","orientacao":"Sincronismo/Link OK.","nome":"IS_OPER_UP"},{"resultado":"OK","orientacao":"Parâmetros dentro do padrão (entre -8 e -30).","nome":"IS_PARAM_OK"},{"resultado":"OK","orientacao":"Não foi identificada falha massiva.","nome":"IS_VIZINHO_OK"},{"resultado":"OK","orientacao":"Mac identificado 10:72:23:19:B7:05.","nome":"HAS_MAC_DSLAM"}],"nome":"CONECTIVIDADE"}],"dataInicio":1517329694042,"dataFim":1517329751454,"customer":{"designador":"RCE-30NCGZJQ-013","instancia":"8134650186","designadorAcesso":"RCE-15395420-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.181.9.21","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":4,"sequencial":1225,"logica":9,"rin":211,"vlanVoip":1211,"vlanVod":3211,"vlanMulticast":4000,"cvlan":1325,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"8134650186","central":"PERCE_LNS03"},"radius":{"status":"ATIVO","armario":"PERCE_G1I07","rin":"211","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"r25600b51200 op:RCE-30NCGZJQ-013","porta":"1225","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1517329517494},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1517329517494},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1517329517494}],"eventos":[]},"executor":"G0034481","fulltest":{"resultado":true,"dataInicio":1517329670278,"dataFim":1517329727620,"mensagem":"Não foram identificados problemas de configuração. Se o problema/sintoma informado pelo cliente persiste, seguir o fluxo.","id":null,"cl":{"designador":"RCE-30NCGZJQ-013","instancia":"8134650186","designadorAcesso":"RCE-15395420-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.181.9.21","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":4,"sequencial":1225,"logica":9,"rin":211,"vlanVoip":1211,"vlanVod":3211,"vlanMulticast":4000,"cvlan":1325,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"8134650186","central":"PERCE_LNS03"},"radius":{"status":"ATIVO","armario":"PERCE_G1I07","rin":"211","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"r25600b51200 op:RCE-30NCGZJQ-013","porta":"1225","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1517329517494},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1517329517494},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1517329517494}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Estado Operacional da Porta","mensagem":"Sincronismo OK.","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Afetação Vizinhança","mensagem":"Não foi identificada falha massiva.","resultado":true,"foiCorrigido":null,"result":null},{"nome":"Associação Serial ONT","mensagem":"Identificado ONT associada: TLCM0001BAC6.","resultado":true,"foiCorrigido":null,"result":{"nome":"Associação Serial ONT","type":"telecom.properties.gpon.SerialOntGpon","serial":"TLCM0001BAC6","slot":null,"porta":null,"idOnt":null}},{"nome":"Parâmetros Ópticos","mensagem":"Parâmetros dentro do padrão (entre -8 e -30).","resultado":true,"foiCorrigido":null,"result":{"nome":"Parâmetros Ópticos","type":"telecom.properties.gpon.TabelaParametrosGpon","potOnt":-18.998,"potOlt":-19.1}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.Profile","profileUp":"HSI_25M_RETAIL_UP","profileDown":"HSI_50M_RETAIL_DOWN","down":"VEL_51200","up":"VEL_25600"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1325,"svlan":211,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Vlan de VoIP configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan VoIP","type":"telecom.properties.VlanVoip","cvlan":1325,"svlan":1211,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"MAC do Equipamento","mensagem":"Mac identificado 10:72:23:19:B7:05.","resultado":true,"foiCorrigido":null,"result":{"nome":"MAC do Equipamento","type":"telecom.properties.DeviceMAC","mac":"10:72:23:19:B7:05"}}]}}');
        //Metalico
        //this.holderService.certification = JSON.parse('{"resultado":"TO_FIX","orientacao":"Tabela de Rede resetada. Consulte a confiabilidade da rede após a execução de um teste de velocidade.","id":"5a6b127ccb66bf059392f53c","blocks":[{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Não há bloqueio no Radius.","nome":"HAS_BLOQ_RADIUS"},{"resultado":"OK","orientacao":"Radius e Inventário de Rede OK.","nome":"IS_INV_REDE_EQUALS_RADIUS"},{"resultado":"OK","orientacao":"Inventário de Rede OK.","nome":"HAS_INV_REDE"},{"resultado":"OK","orientacao":"Inventário de Serviços OK.","nome":"HAS_INV_SERV"}],"nome":"CADASTRO"},{"resultado":"TO_FIX","orientacao":"Tabela de Rede resetada. Consulte a confiabilidade da rede após a execução de um teste de velocidade.","asserts":[{"resultado":"TO_FIX","orientacao":"Tabela de Rede resetada. Consulte a confiabilidade da rede após a execução de um teste de velocidade.","nome":"IS_REDE_BANDA_OK"}],"nome":"PERFORMANCE"},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Vlan de Banda configurado corretamente.","nome":"IS_VLANS_OK"},{"resultado":"OK","orientacao":"Profile configurado corretamente.","nome":"IS_PROFILE_OK"}],"nome":"SERVICOS"},{"resultado":"FISICAL","orientacao":"Parâmetros fora dos padrões.","asserts":[{"resultado":"OK","orientacao":"Porta Ativada (Adm state Up).","nome":"IS_ADM_UP"},{"resultado":"OK","orientacao":"Sincronismo/Link OK.","nome":"IS_OPER_UP"},{"resultado":"FISICAL","orientacao":"Parâmetros fora dos padrões.","nome":"IS_PARAM_OK"},{"resultado":"OK","orientacao":"Modulação configurada corretamente.","nome":"IS_MODUL_OK"},{"resultado":"OK","orientacao":"Mac identificado 8C:10:D4:DA:15:50.","nome":"HAS_MAC_DSLAM"}],"nome":"CONECTIVIDADE"}],"dataInicio":1516966470318,"dataFim":1516966524793,"customer":{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516966398080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516966398080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516966398080}],"eventos":[]},"executor":"G0034481","fulltest":{"resultado":false,"dataInicio":1516966450017,"dataFim":1516966504407,"mensagem":"Parâmetros fora dos padrões.","id":null,"cl":{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516966398080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516966398080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516966398080}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Estado Operacional da Porta","mensagem":"Sincronismo OK.","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Parâmetros","mensagem":"Parâmetros fora dos padrões.","resultado":false,"foiCorrigido":null,"result":{"nome":"Parâmetros","type":"telecom.properties.metalico.TabelaParametrosMetalicoVdsl","snrDown":11.1,"snrUp":12.7,"atnDown":26.1,"atnUp":20.7,"velSincDown":26468.0,"velSincUp":5996.0,"velMaxDown":26384.0,"velMaxUp":9380.0,"snrDown1":11.1,"snrDown2":-65.0,"snrUp1":10.8,"snrUp2":6.1,"atnDown1":42.3,"atnDown2":130.0,"atnUp1":37.0,"atnUp2":48.4}},{"nome":"Confiabilidade de Rede","mensagem":"Tabela de Rede resetada. Consulte a confiabilidade da rede após a execução de um teste de velocidade.","resultado":false,"foiCorrigido":true,"result":{"nome":"Confiabilidade de Rede","type":"telecom.properties.metalico.TabelaRedeMetalico","pctDown":125,"pctUp":124,"crcDown":0,"crcUp":0,"fecDown":0,"fecUp":24,"resync":0,"tempoMedicao":48,"crcOk":true,"pctSuficiente":false}},{"nome":"Modulação","mensagem":"Modulação configurada corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Modulação","type":"telecom.properties.metalico.Modulacao","modulacao":"VDSL_17A_B8_12_SUV","modulEnum":"VDSL"}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.ProfileMetalico","profileUp":"5","profileDown":"50","down":"VEL_51200","up":"VEL_5120"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1185,"svlan":74,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Cliente sem VoIP.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV Híbrida/IPTV.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"MAC do Equipamento","mensagem":"Mac identificado 8C:10:D4:DA:15:50.","resultado":true,"foiCorrigido":null,"result":{"nome":"MAC do Equipamento","type":"telecom.properties.DeviceMAC","mac":"8C:10:D4:DA:15:50"}}]}}');
        this.navCtrl.parent.select(1);
    }

}