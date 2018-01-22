import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CadastroService } from './cadastro.service';
import { LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: [CadastroService]
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    constructor(private cadastroService: CadastroService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public getCadastro() {
        if (!this.holderService.instancia) {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância, o campo não pode estar vazio.");
        } else {
            this.resetHolder();
            let carregando = this.loadingCtrl.create({ content: "Consultando Cadastro" });
            carregando.present();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    super.showError(false);
                    this.holderService.cadastro = response.output.customer;
                }, error => {
                    super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
                    console.log("Deu erro!!! OMG p(o.o)q");                    
                })
                .then(() => {
                    //console.log(this.holderService.cadastro);
                    carregando.dismiss();
                });
        }
    }

    public getMockCadastro() {
        this.holderService.cadastro = JSON.parse('{"designador":"PAE-812GNAJKCY-013","instancia":"5130190034","designadorAcesso":"PAE-11089448-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.151.206.114","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":7,"porta":14,"sequencial":1466,"logica":26,"rin":227,"vlanVoip":1227,"vlanVod":3227,"vlanMulticast":4000,"cvlan":1566,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"5130190034","central":"PRCTA_VMS02"},"radius":{"status":"ATIVO","armario":"RSPAE_O1B75","rin":"227","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"a25600b51200 op:PAE-812GNAJKCY-013","porta":"1466","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516303391080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516303391080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516303391080}],"eventos":[]}');
    }

    private resetHolder() {
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
    }
}