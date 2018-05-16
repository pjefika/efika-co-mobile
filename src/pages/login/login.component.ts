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

    public count: number = 0;

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
            this.holderService.showhidetab = true;
        }
        setTimeout(() => { this.input.setFocus(); }, 150);
    }

    public validEntrar() {
        if (this.holderService.isMock) {
            // --Mock        
            this.entrarMock();
        } else {
            // --Prod
            this.entrar();
        }
    }

    public entrar() {
        this.count = 0;
        this.showHidePassword = false;
        let carregando = this.loadingCtrl.create({ content: "Consultando Login " });
        carregando.present();
        this.loginService
            .entrar(this.usuario)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.loginService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        let verify: boolean = resposta.output.match;
                                        if (verify) {
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                            this.holderService.estalogado = verify;
                                            this.holderService.showhidetab = verify;
                                            this.usuario.matricula = this.usuario.matricula.toUpperCase();
                                            sessionStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
                                        } else {
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                            super.showAlert("Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
                                            this.usuario.matricula = "";
                                            this.usuario.senha = "";
                                        }
                                    }
                                }, error => {
                                    carregando.dismiss();
                                    clearInterval(rqSi);
                                    super.showAlert("Erro ao realizar login", error.mError);
                                });
                        } else {
                            carregando.dismiss();
                            clearInterval(rqSi);
                            super.showAlert("Erro ao realizar login", "Tempo de busca excedido por favor tente novamente.");
                        }
                    }, this.holderService.rtimeout);
                } else {
                    super.showAlert("Erro ao realizar login", response.exceptionMessage);
                    carregando.dismiss();
                }
            }, error => {
                carregando.dismiss();
                super.showError(true, "erro", "Erro ao realizar login", error.mError);
                this.usuario.matricula = "";
                this.usuario.senha = "";
            });
    }

    public entrarMock() {
        let verify: boolean;
        verify = this.loginService.entrarMock(this.usuario);
        if (verify) {
            this.usuario.matricula = "IONIC - TEST";
            sessionStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
            this.holderService.estalogado = verify;
            this.holderService.showhidetab = verify;
        } else {
            super.showError(true, "erro", "Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
            this.usuario.matricula = "";
            this.usuario.senha = "";
        }
    }

}