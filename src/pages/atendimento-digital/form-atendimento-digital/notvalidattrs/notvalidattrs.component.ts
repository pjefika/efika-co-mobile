import { Component, OnInit, Input } from '@angular/core';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { LoadingController, AlertController } from 'ionic-angular';
import { AtendimentoDigitalTabelaValidacao } from '../../../../view-model/atendimento-digital/atendimento-digital-tabela-validacao';

@Component({
    selector: 'notvalidattrs-component',
    templateUrl: 'notvalidattrs.component.html'
})

export class NotValidAttrsComponent extends SuperComponentService implements OnInit {

    @Input()
    public atendimentoDigitalTabelaValidacao: AtendimentoDigitalTabelaValidacao;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { 
        console.log(this.atendimentoDigitalTabelaValidacao);
        
    }

}