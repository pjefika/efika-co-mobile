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

    private count: number = 0;

    private carregando;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        private fulltestService: FulltestService,
        public navCtrl: NavController,
        public alertCtrl: AlertController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

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
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.fulltestService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output)) {
                                            this.holderService.certification = resposta.output.certification;
                                            this.holderService.tabFulltestAtivo = true;
                                            setTimeout(() => {
                                                this.navCtrl.parent.select(2);
                                            }, 1);
                                            this.ativo = false;
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        } else {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert("Ops, aconteceu algo.", error.mError);
                                    this.loading(false);
                                    clearInterval(rqSi);
                                })
                        } else {
                            this.loading(false);
                            super.showAlert("Ops, aconteceu algo.", "Tempo de busca excedido por favor tente novamente.");
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                } else {
                    this.loading(false);
                    super.showAlert("Erro ao realizar fulltest.", response.exceptionMessage);
                }
            }, error => {
                this.loading(false);
                super.showAlert("Ops, ocorreu algo.", error.mError);
                console.log("Deu erro!!! AMD p(o.o)q");
            });
    }

    public fazFulltestMock() {
        let carregando = this.loadingCtrl.create({ content: "Realizando Fulltest" });
        carregando.present();
        setTimeout(() => {
            this.holderService.certification = this.fulltestService.doFulltestMock();
            this.holderService.tabFulltestAtivo = true;
            carregando.dismiss();
            setTimeout(() => {
                this.navCtrl.parent.select(2);
            }, 1);
        }, 300);
    }

    public validDSLAM() {
        if (this.holderService.cadastro.rede.modeloDslam === "LIADSLPT48"
            || this.holderService.cadastro.rede.modeloDslam === "VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "VDPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE"
            || this.holderService.cadastro.rede.modeloDslam === "LI-VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT-C_SIP") {
            super.showAlert("Atenção", "Modelo de DSLAM não implementado, não sendo possivel realizar o Fulltest, necessário contato com o Centro de Operações.");
        }
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