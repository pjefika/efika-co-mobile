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

    private carregando;

    constructor(private confiabilidadeRedeService: ConfiabilidadeRedeService,
        public holderService: HolderService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public getConfRede() {
        this.loading(true, "Aguarde, carregando informações...");
        this.confiabilidadeRedeService
            .getConfRede(this.holderService.instancia, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.confiabilidadeRedeService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output)) {
                                            this.valid = resposta.output.tabRede;
                                            super.showAlert("Sucesso", "Tabela de confiabilidade de rede atualizada com sucesso.");
                                            this.ativo = false;
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        } else {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert(error.tError, error.mError);
                                    this.loading(false);
                                    clearInterval(rqSi);
                                });
                        } else {
                            this.loading(false);
                            super.showAlert("Tempo Excedido.", "Tempo de busca excedido por favor tente novamente. " + super.mountmsgexception(this.holderService.instancia));
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, error.mError);
            })
    }

    private loading(active: boolean, msg?: string, ) {
        if (active) {
            this.carregando = this.loadingCtrl.create({ content: msg });
            this.carregando.present();
        } else {
            this.carregando.dismiss();
        }
    }
}