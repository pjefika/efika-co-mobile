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

    private count: number = 0;

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
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < 9) {
                            this.count++;
                            this.confiabilidadeRedeService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output)) {
                                            this.valid = resposta.output.tabRede;
                                            super.showAlert("Sucesso", "Tabela de confiabilidade de rede atualizada com sucesso.");
                                            this.ativo = false;
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        } else {
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    carregando.dismiss();
                                    clearInterval(rqSi);
                                });
                        } else {
                            carregando.dismiss();
                            clearInterval(rqSi);
                        }
                    }, 15000);
                }
            }, error => {
                super.showAlert("Erro", error.mError);
            });
    }
}