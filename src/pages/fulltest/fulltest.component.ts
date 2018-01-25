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

    public getCertification() {
        this.holderService.certification = JSON.parse('{"resultado":"OK","orientacao":"OK","id":"5a60f649b6c16d15c8d35be8","blocks":[{"resultado":"OK","orientacao":"CADASTRO OK.","asserts":[{"resultado":"OK","orientacao":"Não há bloqueio no Radius.","nome":"HAS_BLOQ_RADIUS"},{"resultado":"OK","orientacao":"Radius e Inventário de Rede OK.","nome":"IS_INV_REDE_EQUALS_RADIUS"}],"nome":"CADASTRO"},{"resultado":"OK","orientacao":"SERVICOS OK.","asserts":[{"resultado":"OK","orientacao":"Vlan de Banda configurado corretamente.\\nVlan de VoIP configurado corretamente.","nome":"IS_VLANS_OK"},{"resultado":"OK","orientacao":"Profile configurado corretamente.","nome":"IS_PROFILE_OK"}],"nome":"SERVICOS"},{"resultado":"OK","orientacao":"PERFORMANCE OK.","asserts":[{"resultado":"OK","orientacao":"Mac identificado 44:AA:F5:58:4B:DD.","nome":"HAS_MAC_DSLAM"}],"nome":"PERFORMANCE"},{"resultado":"OK","orientacao":"CONECTIVIDADE OK.","asserts":[{"resultado":"OK","orientacao":"Porta Ativada (Adm state Up).","nome":"IS_ADM_UP"},{"resultado":"OK","orientacao":"Sincronismo/Link OK.","nome":"IS_OPER_UP"},{"resultado":"OK","orientacao":"Parâmetros dentro do padrão (entre -8 e -30).","nome":"IS_PARAM_OK"},{"resultado":"OK","orientacao":"Não foi identificada falha massiva.","nome":"IS_VIZINHO_OK"}],"nome":"CONECTIVIDADE"}],"dataInicio":1516303877413,"dataFim":1516303945162,"customer":{"designador":"PAE-812GNAJKCY-013","instancia":"5130190034","designadorAcesso":"PAE-11089448-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.151.206.114","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":7,"porta":14,"sequencial":1466,"logica":26,"rin":227,"vlanVoip":1227,"vlanVod":3227,"vlanMulticast":4000,"cvlan":1566,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"5130190034","central":"PRCTA_VMS02"},"radius":{"status":"ATIVO","armario":"RSPAE_O1B75","rin":"227","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"a25600b51200 op:PAE-812GNAJKCY-013","porta":"1466","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516303391080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516303391080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516303391080}],"eventos":[]},"executor":"G0041775","fulltest":{"resultado":true,"dataInicio":1516303391496,"dataFim":1516303444309,"mensagem":"Não foram identificados problemas de configuração. Se o problema/sintoma informado pelo cliente persiste, seguir o fluxo.","id":null,"cl":{"designador":"PAE-812GNAJKCY-013","instancia":"5130190034","designadorAcesso":"PAE-11089448-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.151.206.114","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":7,"porta":14,"sequencial":1466,"logica":26,"rin":227,"vlanVoip":1227,"vlanVod":3227,"vlanMulticast":4000,"cvlan":1566,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"5130190034","central":"PRCTA_VMS02"},"radius":{"status":"ATIVO","armario":"RSPAE_O1B75","rin":"227","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"a25600b51200 op:PAE-812GNAJKCY-013","porta":"1466","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516303391080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516303391080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516303391080}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Estado Operacional da Porta","mensagem":"Sincronismo OK.","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Afetação Vizinhança","mensagem":"Não foi identificada falha massiva.","resultado":true,"foiCorrigido":null,"result":null},{"nome":"Associação Serial ONT","mensagem":"Identificado ONT associada: PACEF5584BDD.","resultado":true,"foiCorrigido":null,"result":{"nome":"Associação Serial ONT","type":"telecom.properties.gpon.SerialOntGpon","serial":"PACEF5584BDD","slot":null,"porta":null,"idOnt":null}},{"nome":"Parâmetros Ópticos","mensagem":"Parâmetros dentro do padrão (entre -8 e -30).","resultado":true,"foiCorrigido":null,"result":{"nome":"Parâmetros Ópticos","type":"telecom.properties.gpon.TabelaParametrosGpon","potOnt":-22.292,"potOlt":-24.9}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.Profile","profileUp":"HSI_25M_RETAIL_UP","profileDown":"HSI_50M_RETAIL_DOWN","down":"VEL_51200","up":"VEL_25600"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1566,"svlan":227,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Vlan de VoIP configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan VoIP","type":"telecom.properties.VlanVoip","cvlan":1566,"svlan":1227,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"MAC do Equipamento","mensagem":"Mac identificado 44:AA:F5:58:4B:DD.","resultado":true,"foiCorrigido":null,"result":{"nome":"MAC do Equipamento","type":"telecom.properties.DeviceMAC","mac":"44:AA:F5:58:4B:DD"}}]}}');
        this.navCtrl.parent.select(1);
    }

}