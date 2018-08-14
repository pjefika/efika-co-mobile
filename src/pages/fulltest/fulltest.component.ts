import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { FulltestService } from './fulltest.service';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    providers: [FulltestService]
})

export class FulltestComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        private fulltestService: FulltestService,
        public navCtrl: NavController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        if (this.holderService.errorneedfkid) {
            this.fazfulltesttogetfkid();
        }

    }

    public fulltest() {
        if (this.holderService.isMock) {
            // --Mock        
            this.fazFulltestMock();
        } else {
            // --Prod
            this.fazFulltest();
        }
    }

    public fazFulltest() {
        this.count = 0;
        this.loading(true, "Realizando Fulltest");
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {
                if (response) {
                    this.startTimer();
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.fulltestService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output, this.holderService.instancia)) {
                                            this.holderService.certification = resposta.output.certification;
                                            this.holderService.tabFulltestAtivo = true;
                                            this.ativo = false;
                                            this.loading(false);
                                            clearInterval(rqSi);
                                            setTimeout(() => {
                                                this.navCtrl.parent.select(2);
                                            }, 1);
                                        } else {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                    this.loading(false);
                                    clearInterval(rqSi);
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
                    super.showAlert(super.makeexceptionmessageTitle("Erro ao realizar fulltest.", true), super.makeexceptionmessage(response.exceptionMessage, this.holderService.instancia));
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                console.log("Deu erro!!! AMD p(o.o)q");
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

    public fazFulltestMock() {
        this.loading(true, "Realizando Fulltest Mock");
        this.startTimer();
        setTimeout(() => {
            this.holderService.certification = this.fulltestService.doFulltestMock().output.certification;
            this.holderService.tabFulltestAtivo = true;
            setTimeout(() => {
                this.navCtrl.parent.select(2);
            }, 1);
            this.ativo = false;
            this.loading(false);
        }, 5000);
    }

    public fazfulltesttogetfkid() {
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {

            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                console.log("Deu erro!!! AMD p(o.o)q");
            });
    }

}