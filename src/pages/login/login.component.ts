import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { LoginUtilService } from '../../util/login-util/login-util.service';

import * as moment from 'moment';
import { Usuario_N } from '../../view-model/usuario/usuario_n';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent extends SuperComponentService implements OnInit {

    public usuario = new Usuario();

    public usuario_n: Usuario_N;

    public showHidePassword: boolean = false;

    @ViewChild('input') private input;

    public count: number = 0;

    constructor(private loginService: LoginService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private loginUtilService: LoginUtilService,
        public navCtrl: NavController) {
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
            // this.entrarMock();
        } else {
            // --Prod
            if (this.userisvalid()) {
                // this.entrarnewauth(); // Nova conf de autenticação
                this.entrar();
            }
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
            super.showAlert("Login ou senha Invalidos", super.makeexceptionmessage("Campos de Matricula e Senha não pode ser vazio."))
        } else {
            valid = true;
        }
        return valid;
    }

    // public entrarMock() {
    //     let verify: boolean;
    //     verify = this.loginService.entrarMock(this.usuario);
    //     if (verify) {
    //         this.usuario.matricula = "IONIC - TEST";
    //         localStorage.setItem("user", JSON.stringify({ user: this.usuario.matricula }));
    //         this.holderService.estalogado = verify;
    //         this.holderService.showhidetab = verify;
    //     } else {
    //         super.showAlert("Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
    //         this.usuario.matricula = "";
    //         this.usuario.senha = "";
    //     }
    // }

    public entrarnewauth() {
        this.loginService
            .entrarnewauth(this.usuario)
            .then(rsp => {
                console.log("entrou then");
                console.log(rsp);
                this.loginService
                    .getuserifos(this.usuario.matricula)
                    .then(resposta => {
                        this.usuario_n = resposta;
                        this.holderService.usuario_n = this.usuario_n;
                    })
                    .then(() => {
                        if (!this.loginUtilService.userIsValid(this.usuario_n)) {
                            // open modal with values
                            setTimeout(() => {
                                this.navCtrl.push(UserModifyComponent);
                            }, 500);
                        } else {
                            localStorage.setItem("user", JSON.stringify({ user: this.holderService.usuario_n.matricula }));
                            this.holderService.estalogado = true;
                            this.holderService.showhidetab = true;
                        }
                    });
            }, error => {
                super.showAlert(error.tError, "Login ou senha incorretos, por favor tente novamente.");
                // super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                this.usuario.matricula = "";
                this.usuario.senha = "";
            });

    }

    public solicitarAcesso() {
        setTimeout(() => {
            this.navCtrl.push(CreateUserComponent);
        }, 500);
    }

    public entrar() {
        this.count = 0;
        this.showHidePassword = false;
        this.loading(true, "Consultando Login");
        this.loginService
            .entrar(this.usuario)
            .then(response => {
                if (response) {
                    this.startTimer();
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
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

}