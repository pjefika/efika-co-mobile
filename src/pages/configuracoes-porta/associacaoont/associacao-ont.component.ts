import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { AssociacaoOntService } from './associacao-ont.service';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'associacao-ont-component',
    templateUrl: 'associacao-ont.component.html',
    providers: [AssociacaoOntService]
})

export class AssociacaoOntComponent extends SuperConfPortaService implements OnInit {

    constructor(public alertCtrl: AlertController) { super(alertCtrl); }

    public ngOnInit() { }

}