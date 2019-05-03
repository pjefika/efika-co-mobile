import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { LoadingController, AlertController, NavParams } from 'ionic-angular';
import { HolderService } from '../../../../providers/holder/holder.service';
import { ReOpenAntendimentoDigital } from '../../../../view-model/atendimento-digital/atendimento-digital';

@Component({
    selector: 'desc-atendimento-digital',
    templateUrl: 'desc-atendimento-digital.component.html'
})

export class DescAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    public observacao: string;

    public reOpenAntendimentoDigital: ReOpenAntendimentoDigital;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navParams: NavParams) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {

        console.log(this.navParams.get('desc'));




    }

    public reOpenAtendimento() {

        this.reOpenAntendimentoDigital = {
            atendimento: 1,
            tecnico: this.holderService.user.id,
            user: 1,
            observacao: this.observacao
        }
        
        console.log(this.reOpenAntendimentoDigital);
        



    }




}