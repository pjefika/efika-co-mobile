import { Component, OnInit } from '@angular/core';
import { InfoMuralService } from './info-mural.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

import { LoadingController, AlertController } from 'ionic-angular';

@Component({
    selector: 'info-mural-component',
    templateUrl: 'info-mural.component.html',
    providers: [InfoMuralService]
})

export class InfoMuralComponent extends SuperComponentService implements OnInit {

    public mostraMural: boolean = true;

    constructor(private infoMuralService: InfoMuralService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.infoMuralService.logMural();
    }

}