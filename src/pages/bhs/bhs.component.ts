import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'bhs-component',
    templateUrl: 'bhs.component.html'
})

export class BhsComponent extends SuperComponentService implements OnInit {

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {

        // this.holderService.cadastro.rede.bhs
    }


    public showBhs(): boolean {
        let valid: boolean = false;
        if (this.holderService.cadastro.rede.planta === "VIVO1" &&
            this.holderService.cadastro.rede.tipo === "GPON") {
            valid = true;
        }
        return valid;
    }

}