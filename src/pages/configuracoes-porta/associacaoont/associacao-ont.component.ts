import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, NavController } from 'ionic-angular';
import { OntsLivrsComponent } from './onts-livres/onts-livres.component';

@Component({
    selector: 'associacao-ont-component',
    templateUrl: 'associacao-ont.component.html',
})

export class AssociacaoOntComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController, public navCtrl: NavController) { super(alertCtrl); }

    public ngOnInit() { }

    public getOntsLivres() {
        this.navCtrl.push(OntsLivrsComponent);
    }

}