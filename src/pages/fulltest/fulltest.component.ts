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
        let carregando = this.loadingCtrl.create({ content: "Realizando Fulltest" });
        carregando.present();
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
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        } else {
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
                                    carregando.dismiss();
                                    clearInterval(rqSi);
                                });
                        } else {
                            super.showError(true, "erro", "Ops, aconteceu algo.", "Tempo de busca excedido por favor tente novamente.");
                            carregando.dismiss();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                } else {
                    super.showError(true, "erro", "Erro ao realizar busca de cadastro", response.exceptionMessage);
                }
            }, error => {
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

}