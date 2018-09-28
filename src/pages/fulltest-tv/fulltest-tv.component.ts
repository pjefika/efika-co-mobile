import { Component, OnInit } from '@angular/core';
import { FulltestTVService } from './fulltest-tv.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { Stbs } from '../../view-model/fulltestTV/stbs';

@Component({
    selector: 'fulltest-tv-component',
    templateUrl: 'fulltest-tv.component.html',
    providers: [FulltestTVService]
})

export class FulltestTVComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    public stbs: Stbs[];

    public disableButtonDoFulltestTV: boolean = false;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private fulltestTVService: FulltestTVService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        if (this.holderService.cadastro.servicos.tipoTv !== "IPTV") {
            super.showAlert("Atenção", "Cliente não é IPTV");
            this.disableButtonDoFulltestTV = true;
        }
    }

    public doFulltestTV() {
        if (this.holderService.isMock) {
            this.getFulltestTVMock();
        } else {
            this.fazManobra();
            // this.getFulltestTVMock();
        }
    }

    public fazManobra() {
        this.count = 0;
        this.loading(true, "Realizando diagnóstivo HPNA");
        let qntErro: number = 0;
        this.fulltestTVService
            .setTaskManobra(this.holderService.cadastro)
            .then(resposta => {
                if (resposta) {
                    this.startTimer();
                    let rqSi = setInterval(() => {
                        if (this.count < 40) {
                            this.count++;
                            this.fulltestTVService
                                .gettask(resposta.id)
                                .then(_resposta => {
                                    if (_resposta.state === "EXECUTED") {
                                        this.holderService.certificationTV = _resposta.output.resposta;
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                });
                            if (this.count === 40 && this.holderService.certification) {
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

    private getFulltestTVMock() {
        this.holderService.certificationTV = this.fulltestTVService.getFulltestTVMock().output.resposta;
    }

    private startTimer() {
        this.doTimer((40 * this.holderService.rtimeout) / 1000);
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

}