import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { ConfiabilidadeRedeService } from './confiabilidade-rede.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'confiabilidade-rede-component',
    templateUrl: 'confiabilidade-rede.component.html',
    providers: [ConfiabilidadeRedeService]
})

export class ConfiabilidadeRedeComponent extends SuperConfPortaService implements OnInit {

    constructor(private confiabilidadeRedeService: ConfiabilidadeRedeService,
        public holderService: HolderService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public getConfRede() {
        let carregando = this.loadingCtrl.create({ content: "Aguarde..." });
        carregando.present();
        this.confiabilidadeRedeService
            .getConfRede(this.holderService.instancia, this.holderService.cadastro)
            .then(response => {
                if (super.validState(response.output)) {
                    this.valid = response.output.tabRede;
                    super.showAlert("Sucesso", "Tabela de confiabilidade de rede atualizada com sucesso.");
                }
            }, error => {
                // error.mError
                super.showAlert("Erro", "Em desenvolvimento.");
            })
            .then(() => {
                carregando.dismiss();
            });
    }

}