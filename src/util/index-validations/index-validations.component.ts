import { Component, OnInit } from '@angular/core';
import { IndexValidationsService } from './index-validations.service';

import { AlertController, LoadingController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { HolderService } from '../../providers/holder/holder.service';
import { NotificationService } from '../../providers/notification/notification.service';
import { IndexValidations } from '../../view-model/index-validations/index-validations';

declare let ClientIP: any;

@Component({
    selector: 'index-validations-component',
    templateUrl: 'index-validations.component.html',
    providers: [IndexValidationsService]
})

export class IndexValidationsComponent extends SuperComponentService implements OnInit {

    public version: string;

    public infoSys: IndexValidations;

    constructor(private indexValidationsService: IndexValidationsService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public holderService: HolderService,
        public notificationService: NotificationService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.version = super.getVersion();
        // this.getIpEthernet();
        this.ipsprivateandpublicisequeal();
        this.getInfosSystem();
        this.notificationService.allowNotify();
    }

    public getInfosSystem() {

        this.indexValidationsService
            .getInfosSystem()
            .then(resposta => {
                if (resposta) {
                    this.infoSys = resposta;
                    this.validversion();
                    this.validEmManutencao();
                }
            }, error => {
                console.log("Não foi possivel carregar informações de sistema.");
            });

    }

    public validversion() {
        if (this.infoSys.version.usevalid) {
            if (this.version !== this.infoSys.version.nome) {
                super.showAlert("Versão divirgente", super.makeexceptionmessage("A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + this.infoSys.version + "."), true);
                // this.notificationService.notify("Versão divirgente", "A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + this.infoSys.version + ".");
            }
        }
    }

    public validEmManutencao() {
        if (this.infoSys.manutencao.usevalid) {
            this.holderService.emManutencao = this.infoSys.manutencao.estaEmManutencao;
            if (this.holderService.emManutencao) {
                super.showAlert("Mantenção.", "Estamos em manutenção por favor aguarde...", true);
            }
        }
    }

    public getIpEthernet() {
        setTimeout(() => {
            let pvip = ClientIP;
            console.log(pvip);
        }, 1000);
    }

    public ipsprivateandpublicisequeal() {
        let publicIP = window.location.origin;
        let privateIP = ClientIP;
        if (privateIP != publicIP) {
            this.holderService.validipspublicandprivate = false;
        }
    }

}