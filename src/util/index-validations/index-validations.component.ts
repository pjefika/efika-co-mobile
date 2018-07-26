import { Component, OnInit } from '@angular/core';
import { IndexValidationsService } from './index-validations.service';

import { AlertController, LoadingController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { HolderService } from '../../providers/holder/holder.service';
import { NotificationService } from '../../providers/notification/notification.service';
import { IndexValidations } from '../../view-model/index-validations/index-validations';
// import { CreateUserComponent } from '../../pages/login/create-user/create-user.component';

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
        public notificationService: NotificationService,
        //public navCtrl: NavController
    ) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.version = super.getVersion();
        // this.getIpEthernet();
        this.ipsprivateandpublicisequeal();
        this.getInfosSystem();
        this.notificationService.allowNotify();
        // this.alertParaSolicitarAcesso();
    }

    public getInfosSystem() {
        this.indexValidationsService
            .getInfosSystem()
            .then(resposta => {
                if (resposta) {
                    this.infoSys = resposta;
                    if (this.infoSys.useValidations) {
                        this.validversion();
                        this.validEmManutencao();
                    }
                }
            }, error => {
                console.log("Não foi possivel carregar informações de sistema.");
            });
    }

    public validversion() {
        if (this.version !== this.infoSys.version) {
            super.showAlert("Versão divirgente", super.makeexceptionmessage("A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + this.infoSys.version + "."), true);
            // this.notificationService.notify("Versão divirgente", "A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + this.infoSys.version + ".");
        }
    }

    public validEmManutencao() {
        this.holderService.emManutencao = this.infoSys.estaEmManutencao;
        if (this.holderService.emManutencao) {
            super.showAlert("Mantenção.", "Estamos em manutenção por favor aguarde...", true);
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

    public alertParaSolicitarAcesso() {
        // let alert = this.alertCtrl.create({
        //     title: "Atualização de cadastro",
        //     subTitle: "Atenção, estamos realizando uma atulização de cadastro e precisamos que seja preenchido o forumulario de acesso até o dia 31/07.",
        //     buttons: [
        //         {
        //             text: "Solicitar Acesso",
        //             handler: () => {
        //                 setTimeout(() => {
        //                     this.navCtrl.push(CreateUserComponent);
        //                 }, 500);
        //             }
        //         },
        //         {
        //             text: 'Cancel',
        //             role: 'cancel'
        //         }
        //     ]
        // });
        // alert.present();
    }


}