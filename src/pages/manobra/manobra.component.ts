import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { ManobraService } from './manobra.service';

@Component({
    selector: 'manobra-component',
    templateUrl: 'manobra.component.html',
    providers: [ManobraService]
})

export class ManobraComponent extends SuperComponentService implements OnInit {

    public workerOrderId: string;
    public motivo: string;

    private count: number = 0;

    public disablemanobraform: boolean = false;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private manobraService: ManobraService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {

    }

    public doManobra() {
        if (this.holderService.isMock) {
            if (this.workerOrderId && this.motivo) {
                this.getManobraMock();
            } else {
                super.showAlert("Campos incompletos", "Por favor preencha todos os campos");
            }
        } else {
            if (this.workerOrderId && this.motivo) {
                this.fazManobra();
            } else {
                super.showAlert("Campos incompletos", "Por favor preencha todos os campos");
            }
        }
    }

    public fazManobra() {
        this.count = 0;
        this.loading(true, "Realizando validação de manobra");
        let qntErro: number = 0;
        this.manobraService
            .setTaskManobra(this.holderService.cadastro, this.workerOrderId, this.motivo)
            .then(resposta => {
                if (resposta) {
                    this.startTimer();
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.manobraService
                                .gettask(resposta.id)
                                .then(_resposta => {
                                    if (_resposta.state === "EXECUTED") {
                                        if (_resposta.output.state === "EXCEPTION") {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                            super.showAlert("Ops, Aconteceu algo", super.makeexceptionmessage(_resposta.output.exceptionMessage + " Para avaliação de manobra, ligar no CO", this.holderService.instancia));
                                        } else {
                                            this.holderService.validManobra = _resposta.output.resposta;
                                            this.disablemanobraform = true;
                                            this.loading(false);
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
                            if (this.count === this.holderService.rcount && this.holderService.certification) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.loading(false);
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout)
                } else {
                    this.loading(false);
                    super.showAlert(super.makeexceptionmessageTitle("Erro ao realizar fulltest.", true), super.makeexceptionmessage(resposta.exceptionMessage, this.holderService.instancia));
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                console.log("Deu erro!!! AMD p(o.o)q");
            });
    }

    private getManobraMock() {
        this.loading(true, "Realizando validação de manobra");
        this.holderService.validManobra = this.manobraService.gettaskMock().output.resposta;
        this.disablemanobraform = true;
        this.loading(false);
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. Para avaliação de manobra, ligar no CO", this.holderService.instancia));
    }

}