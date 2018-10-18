import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { BhsService } from './bhs.service';

@Component({
    selector: 'bhs-component',
    templateUrl: 'bhs.component.html',
    providers: [BhsService]
})

export class BhsComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private bhsService: BhsService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public configVlan() {
        if (this.holderService.isMock) {

        } else {
            this.doConfigVlan();
        }
    }

    private doConfigVlan() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Realizando Configurações");
        this.bhsService
            .doConfigVlan(this.holderService.cadastro)
            .then(response => {
                if (response) {
                    this.startTimer();
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.bhsService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output, this.holderService.instancia)) {
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
                    }, this.holderService.rtimeout);
                } else {
                    this.loading(false);
                    super.showAlert(super.makeexceptionmessageTitle("Ocorreu algo.", true), super.makeexceptionmessage(response.exceptionMessage, this.holderService.instancia));
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                console.log("Deu erro!!! AMD p(o.o)q");
            });
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public showBhs(): boolean {
        let valid: boolean = false;
        if (this.holderService.cadastro.rede.planta === "VIVO1" &&
            this.holderService.cadastro.rede.tipo === "GPON") {
            valid = true;
        }
        return valid;
    }

}