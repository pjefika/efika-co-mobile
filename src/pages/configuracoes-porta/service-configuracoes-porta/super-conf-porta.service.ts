import { Injectable, Input } from '@angular/core';
import { Valids } from '../../../view-model/fulltest/validacao';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class SuperConfPortaService extends SuperComponentService {

    @Input() public valid: Valids;
    @Input() public valids: Valids[];

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl, loadingCtrl);
    }

}