import { Component, OnInit } from '@angular/core';
import { IndexValidationsService } from './index-validations.service';

import { LoadingController, AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'index-validations-component',
    templateUrl: 'index-validations.component.html',
    providers: [IndexValidationsService]
})

export class IndexValidationsComponent extends SuperComponentService implements OnInit {

    public version: string;

    public infoSys: {
        version: string;
        estaEmManutencao: boolean;
    }

    constructor(private indexValidationsService: IndexValidationsService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.version = super.getVersion();
        this.getIpEthernet();
        // this.getInfosSystem();
    }

    public getInfosSystem() {
        this.indexValidationsService
            .getInfosSystem()
            .then(resposta => {
                this.infoSys = resposta;
                this.validversion();
                this.validEmManutencao();
            }, error => {
                console.log("Não foi possivel carregar informações do sistema.");
            });
    }

    public validversion() {
        if (this.version !== this.infoSys.version) {
            super.showAlert("Versão divirgente", super.makeexceptionmessage("A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + this.infoSys.version + "."), true);
        }
    }

    public validEmManutencao() {
        this.holderService.emManutencao = this.infoSys.estaEmManutencao;
        if (this.holderService.emManutencao) {
            super.showAlert("Mantenção.", "Estamos em manutenção por favor aguarde...", true);
        }
    }

    public getIpEthernet() {
        this.indexValidationsService
            .getIpEthernet()
            .then(resposta => {
                this.holderService.myip = resposta.ip;
            });
    }

}