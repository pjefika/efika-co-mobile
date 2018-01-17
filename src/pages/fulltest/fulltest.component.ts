import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { FulltestService } from './fulltest.service';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    providers: [FulltestService]
})

export class FulltestComponent {

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        private fulltestService: FulltestService,
        public navCtrl: NavController) { }

    public ngOnInit() { }

    public fazFulltest() {
        let carregando = this.loadingCtrl.create({
            content: "Realizando Fulltest"
        });
        carregando.present();
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {
                this.holderService.objectValid = response;
                this.navCtrl.parent.select(1);
            }, error => {
                console.log("Deu erro!!! OMG p(o.o)q");
            })
            .then(() => {
                carregando.dismiss();
            });
    }

    public getValidacaoMock() {
        this.holderService.objectValid = this.fulltestService.getValidacaoMock();
        this.navCtrl.parent.select(1);
        console.log(this.holderService.objectValid);
    }

}