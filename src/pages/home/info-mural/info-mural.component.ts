import { Component, OnInit } from '@angular/core';
import { InfoMuralService } from './info-mural.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { InfoMural } from '../../../view-model/mural/mural';
import { MensagemMuralComponent } from './mensagem-mural/mensagem-mural.component';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'info-mural-component',
    templateUrl: 'info-mural.component.html',
    providers: [InfoMuralService]
})

export class InfoMuralComponent extends SuperComponentService implements OnInit {

    public infosMural: InfoMural[];

    constructor(private infoMuralService: InfoMuralService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        if (this.holderService.isMock) {
            this.getInfoMuralMock();
        } else {
            // this.getInfoMural();
            this.getInfoMuralMock();
        }
    }

    public getInfoMuralMock() {
        this.infoMuralService
            .getInfoMural()
            .then(resposta => {
                this.infosMural = resposta;
            });
    }

    public getInfoMural() {
        this.infoMuralService
            .getInfoMural()
            .then(resposta => {
                this.infosMural = resposta;
            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            });
    }

    public openInfoMural(im: InfoMural) {      
        this.navCtrl.push(MensagemMuralComponent, im);
    }

}