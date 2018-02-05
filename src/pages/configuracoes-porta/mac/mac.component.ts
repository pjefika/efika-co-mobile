import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'mac-component',
    templateUrl: 'mac.component.html'
})

export class MacComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController) { super(alertCtrl); }

    public ngOnInit() { }

}