import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { OntsLivrsComponent } from './onts-livres/onts-livres.component';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'associacao-ont-component',
    templateUrl: 'associacao-ont.component.html',
})

export class AssociacaoOntComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController, 
        public navCtrl: NavController, 
        public loadingCtrl: LoadingController,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public getOntsLivres() {
        this.navCtrl.push(OntsLivrsComponent);
    }

}