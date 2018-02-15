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
        let carregando = this.loadingCtrl.create({ content: "Realizando Fulltest" });
        carregando.present();
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {
                if (super.validState(response.output)) {
                    this.holderService.certification = response.output.certification;
                    this.holderService.tabFulltestAtivo = true;
                    setTimeout(() => {
                        this.navCtrl.parent.select(2);
                    }, 1);
                }
            }, error => {
                super.showAlert("Ops, ocorreu algo.", error.mError);
                console.log("Deu erro!!! AMD p(o.o)q");
            })
            .then(() => {
                carregando.dismiss();
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