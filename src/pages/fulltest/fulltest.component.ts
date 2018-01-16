import { Component } from '@angular/core';
import { HolderService } from '../../providers/holder/holderService';
import { LoadingController } from 'ionic-angular';
import { FulltestService } from './fulltest.service';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html',
    providers: [FulltestService]
})

export class FulltestComponent {

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        private fulltestService: FulltestService) { }

    public ngOnInit() {
        // if (!this.holderService.objectValid) {
        //     this.fazFulltest();
        // }
    }

    public fazFulltest() {
        let carregando = this.loadingCtrl.create({
            content: "Realizando Fulltest"
        });
        carregando.present();
        this.fulltestService
            .doFulltest(this.holderService.cadastro)
            .then(response => {
                this.holderService.objectValid = response;
            }, error => {
                console.log("Deu erro!!! OMG p(o.o)q");
            })
            .then(() => {
                carregando.dismiss();
            });
    }

    public getValidacaoMock() {
        this.holderService.objectValid = this.fulltestService.getValidacaoMock();
        console.log(this.holderService.objectValid);
    }

}