import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'vlan-component',
    templateUrl: 'vlan.component.html'
})

export class VlanComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController) { super(alertCtrl); }

    public ngOnInit() { }
}