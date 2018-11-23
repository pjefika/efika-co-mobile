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
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public getConfRede() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Aguarde, carregando informações...");
        this.confiabilidadeRedeService
            .getConfRede(this.holderService.instancia, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        this.startTimer();
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.confiabilidadeRedeService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        this.loading(false);
                                        if (super.validState(resposta.output, this.holderService.instancia)) {
                                            this.valid = resposta.output.tabRede;
                                            super.showAlert("Sucesso", "Tabela de confiabilidade de rede atualizada com sucesso.");
                                            this.ativo = false;
                                            clearInterval(rqSi);
                                        } else {
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                });
                            if (this.count === this.holderService.rcount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }
    
    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }
}