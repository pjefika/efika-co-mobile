import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { LoadingController, AlertController } from 'ionic-angular';
import { Usuario_N } from '../../../view-model/usuario/usuario_n';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'create-user-component',
    templateUrl: 'create-user.component.html',
    providers: [CreateUserService]
})

export class CreateUserComponent extends SuperComponentService implements OnInit {

    public usuario_n = new Usuario_N();

    constructor(//private createUserService: CreateUserService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() { }

    public pedirAcesso() {
        console.log(this.usuario_n);
        if (this.usuario_n) {
            if (this.usuario_n.contato && this.usuario_n.email && this.usuario_n.matricula) {
                super.showAlert("Sucesso", "Acesso solicitado com sucesso.");
                this.navCtrl.pop();
            } else {
                super.showAlert("Campos incompletos", "Por favor preencha todos os campos para solicitar o acesso.");
            }
        } else {
            super.showAlert("Campos incompletos", "Por favor preencha todos os campos para solicitar o acesso.");
        }

    }

}