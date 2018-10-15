import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from './reset-password.service';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'reset-password-component',
    templateUrl: 'reset-password.component.html',
    providers: [ResetPasswordService]
})

export class ResetPasswordComponent extends SuperComponentService implements OnInit {

    public matricula: string;

    public cpf: string;

    public senha: string;

    public repeatsenha: string;

    public showHidePassword: boolean = false;

    constructor(public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public holderService: HolderService,
        private resetPasswordService: ResetPasswordService,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public reset() {
        if (this.validpassword() && this.validinputs()) {
            this.resetPasswordService
                .resetpassword(this.matricula, this.cpf, this.senha)
                .then(resposta => {
                    if (resposta) {
                        super.showAlert("Sucesso", "Senha resetada com sucesso");
                        this.navCtrl.pop();
                    }
                }, error => {
                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                });
        } else {
            super.showAlert("Campo incorretos", "Por favor verifique os campos os mesmos estão incompletos ou incorretos");
        }
    }

    private validinputs(): boolean {
        let valid: boolean = false;
        if (this.matricula && this.cpf) {
            valid = true;
        }
        return valid;
    }

    private validpassword(): boolean {
        let valid: boolean = false;
        if (this.senha === this.repeatsenha) {
            valid = true;
        }
        return valid;
    }

}