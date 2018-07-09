import { Component, OnInit } from '@angular/core';
import { AtualizacaoService } from './em-manutencao.service';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
    selector: 'em-manutencao-component',
    templateUrl: 'em-manutencao.component.html',
    providers: [AtualizacaoService]
})

export class EmManutencaoComponent extends SuperComponentService implements OnInit {

    constructor(private atualizacaoService: AtualizacaoService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.getInfosSystem();
    }

    public getInfosSystem() {
        this.atualizacaoService
            .getInfosSystem()
            .then(resposta => {
                this.holderService.emManutencao = resposta.estaEmManutencao;
                if (this.holderService.emManutencao) {
                    super.showAlert("Mantenção.", "Estamos em manutenção por favor aguarde...", true);
                }
            });
    }

}