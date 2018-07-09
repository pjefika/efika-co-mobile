import { Component, OnInit } from '@angular/core';
import { InfoMuralService } from './info-mural.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { InfoMural } from '../../../view-model/mural/mural';
import { MensagemMuralComponent } from './mensagem-mural/mensagem-mural.component';

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
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.getInfoMuralMock();
    }

    public getInfoMuralMock() {
        this.infoMuralService
            .getInfoMuralMock()
            .then(resposta => {
                this.infosMural = resposta;
            });
    }

    public openInfoMural(im: InfoMural) {
        this.navCtrl.push(MensagemMuralComponent, im);
    }

}