import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController, AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';
import { LoginUtilService } from '../../util/login-util/login-util.service';

import * as moment from 'moment';

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

    private carregando;

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
            // this.entrar();
            this.validSession();
        }
    }

    public validSession() {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let miliday: number = 86400000; // 24h - 86400000
        if (localStorage === null || localStorage === undefined) {
            if (Math.abs(moment().diff(userSession.lastlogin)) < miliday) {
                // Valido
                this.holderService.estalogado = true;
                this.holderService.showhidetab = true;
                this.usuario.matricula = userSession.user;
            } else {
                // Expirado
                localStorage.clear();
                this.entrar();
            }
        } else {
            this.entrar();
        }
    }

    public entrar() {
        this.count = 0;
        this.showHidePassword = false;
        this.loading(true, "Consultando Login ");
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
                                            this.loading(false);
                                            clearInterval(rqSi);
                                            this.holderService.estalogado = verify;
                                            this.holderService.showhidetab = verify;
                                            this.usuario.matricula = this.usuario.matricula.toUpperCase();
                                            let dateLastLogin: Date = new Date();
                                            localStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula, lastlogin: dateLastLogin }));
                                        } else {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                            super.showAlert("Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente." + " versão: " + super.getVersion());
                                            this.usuario.matricula = "";
                                            this.usuario.senha = "";
                                        }
                                    }
                                }, error => {
                                    this.loading(false);
                                    clearInterval(rqSi);
                                    super.showAlert(error.tError, error.mError);
                                });
                        } else {
                            this.loading(false);
                            clearInterval(rqSi);
                            super.showAlert("Tempo Excedido.", "Tempo de busca excedido por favor tente novamente. " + super.mountmsgexception());
                        }
                    }, this.holderService.rtimeout);
                } else {
                    this.loading(false);
                    super.showAlert("Erro ao realizar login", response.exceptionMessage + " versão: " + super.getVersion());
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, error.mError);
                this.usuario.matricula = "";
                this.usuario.senha = "";
            });
    }

    public entrarMock() {
        let verify: boolean;
        verify = this.loginService.entrarMock(this.usuario);
        if (verify) {
            this.usuario.matricula = "IONIC - TEST";
            localStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
            this.holderService.estalogado = verify;
            this.holderService.showhidetab = verify;
        } else {
            super.showAlert("Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
            this.usuario.matricula = "";
            this.usuario.senha = "";
        }
    }

    private loading(active: boolean, msg?: string, ) {
        if (active) {
            this.carregando = this.loadingCtrl.create({ content: msg });
            this.carregando.present();
        } else {
            this.carregando.dismiss();
        }
    }

}