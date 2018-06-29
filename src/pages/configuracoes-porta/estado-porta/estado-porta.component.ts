import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'estado-porta-component',
    templateUrl: 'estado-porta.component.html'
})

export class EstadoPortaComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() { }

}