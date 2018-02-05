import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController, AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';
import { LoginUtilService } from '../../util/login-util/login-util.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent extends SuperComponentService implements OnInit {

    public usuario = new Usuario();

    public showHidePassword: boolean = false;

    @ViewChild('input') private input;

    constructor(private loginService: LoginService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public loginUtilService: LoginUtilService) {
        super(alertCtrl);
    }

    public ngOnInit() {
        if (this.loginUtilService.isLogado()) {
            this.holderService.estalogado = true;
        }
        setTimeout(() => { this.input.setFocus(); }, 150);
    }

    public validEntrar() {
        // --Prod
        this.entrar();
        // --Mock        
        // this.entrarMock();
    }

    public entrar() {
        this.showHidePassword = false;
        let carregando = this.loadingCtrl.create({ content: "Consultando Login" });
        carregando.present();
        this.loginService
            .entrar(this.usuario)
            .then(response => {
                if (super.validState(response.output)) {
                    let verify: boolean = response.output.match;
                    if (verify) {
                        this.holderService.estalogado = verify;
                        this.usuario.matricula = this.usuario.matricula.toUpperCase();
                        sessionStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
                    } else {
                        super.showError(true, "erro", "Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
                        this.usuario.matricula = "";
                        this.usuario.senha = "";
                    }
                }
            }, error => {
                super.showError(true, "erro", "Erro ao realizar login", error.mError);
                this.usuario.matricula = "";
                this.usuario.senha = "";
            })
            .then(() => {
                carregando.dismiss();
            });
    }

    public entrarMock() {
        let verify: boolean;
        verify = this.loginService.entrarMock(this.usuario);
        if (verify) {
            sessionStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
            this.holderService.estalogado = verify;
        } else {
            super.showError(true, "erro", "Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
            this.usuario.matricula = "";
            this.usuario.senha = "";
        }
    }

}