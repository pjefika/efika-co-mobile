import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController, AlertController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
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

    constructor(private loginService: LoginService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public loginUtilService: LoginUtilService) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {

        this.validwheninit();

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
            if (this.userisvalid()) {
                this.entrar();
            }
            // this.validSession();
        }
    }

    public validwheninit() {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let miliday: number = 43200000; // 24h - 86400000 // 12h - 43200000
        if (userSession != null || userSession != undefined) {
            if (Math.abs(moment().diff(userSession.lastlogin)) < miliday) {
                // Valido
                this.holderService.estalogado = true;
                this.holderService.showhidetab = true;
                this.usuario.matricula = userSession.user;
            } else {
                // Expirado
                localStorage.clear();
            }
        }
    }

    private userisvalid() {
        let valid: boolean = false;
        if (this.usuario.matricula === null || this.usuario.matricula === undefined || this.usuario.senha === null || this.usuario.senha === undefined) {
            valid = false;
            super.showAlert("Login ou senha Invalidos", "Campos de Matricula e Senha não pode ser vazio." + " versão: " + super.getVersion());
        } else {
            valid = true;
        }
        return valid;
    }

    public entrar() {
        this.count = 0;
        this.showHidePassword = false;
        this.loading(true, "Consultando Login");
        this.startTimer();
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
                                            super.showAlert("Erro ao realizar login", super.makeexceptionmessage("Login ou senha incorretos, por favor tente novamente."));
                                            this.usuario.matricula = "";
                                            this.usuario.senha = "";
                                        }
                                    }
                                }, error => {
                                    this.loading(false);
                                    clearInterval(rqSi);
                                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                                });
                            if (this.count === this.holderService.rcount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            clearInterval(rqSi);
                            this.tempobuscaexcedido();
                        }
                    }, this.holderService.rtimeout);
                } else {
                    this.loading(false);
                    super.showAlert(super.makeexceptionmessageTitle("Erro ao realizar login.", true), super.makeexceptionmessage(response.exceptionMessage));
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                this.usuario.matricula = "";
                this.usuario.senha = "";
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido.", true), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
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

}