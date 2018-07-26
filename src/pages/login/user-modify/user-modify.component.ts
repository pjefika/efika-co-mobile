import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

import { LoadingController, AlertController } from 'ionic-angular';
import { LoginUtilService } from '../../../util/login-util/login-util.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { UserModifyService } from './user-modify.service';

@Component({
    selector: 'user-modify-component',
    templateUrl: 'user-modify.component.html',
    providers: [UserModifyService]
})

export class UserModifyComponent extends SuperComponentService implements OnInit {

    constructor(private userModifyService: UserModifyService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private loginUtilService: LoginUtilService,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.uservalid();
    }

    public updateuser() {
        if (this.uservalid()) {
            this.userModifyService
                .updateuserinfo(this.holderService.usuario_n)
                .then(resposta => {
                    console.log(resposta);     
                    this.holderService.usuario_n = resposta;               
                    localStorage.setItem("user", JSON.stringify({ user: this.holderService.usuario_n.matricula }));
                    this.holderService.estalogado = true;
                    this.holderService.showhidetab = true;
                }, error => {
                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                });
        }
    }

    public uservalid(): boolean {
        let valid = this.loginUtilService.userIsValid(this.holderService.usuario_n);
        if (!valid) {
            super.showAlert("Cadastro incompleto", "Por favor preencha todos os campos do seu cadastro e matenha o mesmo sempre atualizado.");
        }
        return valid;
    }

}