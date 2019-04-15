import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
import { AtendimentoDigital } from '../../../view-model/atendimento-digital/atendimento-digital';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'form-atendimento-digital-component',
    templateUrl: 'form-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class FormAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    public atendimentoDigital: AtendimentoDigital;

    constructor(private atendimentoDigitalService: AtendimentoDigitalService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.atendimentoDigital = new AtendimentoDigital();
    }


    public setAtendimento() {
        this.loading(true, "Enviando atendimento");
        this.atendimentoDigital.nomeTecnico = this.holderService.user.name;
        this.atendimentoDigital.matriculaTecnico = this.holderService.user.matricula;
        this.atendimentoDigital.telefoneTecnico = this.holderService.user.phone;
        this.atendimentoDigital.emailTecnico = this.holderService.user.email;

        this.atendimentoDigital.fkId = this.holderService.certification.fkId;

        this.atendimentoDigitalService
            .setAtendimento(this.atendimentoDigital)
            .then(resposta => {
                super.showAlert("Sucesso", "Atendimento Enviado com sucesso, por favor aguarde.");
            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            })
            .then(() => {
                this.loading(false);
            });
    }


}