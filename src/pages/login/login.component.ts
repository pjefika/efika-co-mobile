import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { LoginUtilService } from '../../util/login-util/login-util.service';

import * as moment from 'moment';
import { UserModifyComponent } from './user-modify/user-modify.component';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent extends SuperComponentService implements OnInit {

    // Objeto para segurar login e senha para realizar login
    public usuario = new Usuario();

    // Mostra e esconde senha no input
    public showHidePassword: boolean = false;

    // variavel para forcar o foco no input ao entrar no component
    @ViewChild('input') private input;

    // Valida se o mesmo veio da inicialização rapida (se já esta logado)
    private comefromfastinit: boolean = false;

    constructor(private loginService: LoginService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private loginUtilService: LoginUtilService,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.validwheninit();
        if (this.loginUtilService.isLogado()) {
            this.holderService.estalogado = true;
            this.holderService.showhidetab = true;
        }
        setTimeout(() => { this.input.setFocus(); }, 150);
    }

    /**
     * Chamada de tela para entrada de login com validação se o mesmo é mock ou produção/qa
     */
    public validEntrar() {
        if (this.userisvalid()) {
            if (this.holderService.isMock) {
                // --Mock   
                // this.entrarnewauthMock();
                // this.getinfonewauthmock();
            } else {
                // --Prod / QA
                this.getinfonewauth();
            }
        }
    }

    // Validação sessão do usuário de 12 horas caso tempo excedido o mesmo necessitará fazer login novamente caso não irá logar direto.
    public validwheninit() {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let miliday: number = 43200000; // 24h - 86400000 // 12h - 43200000
        if (userSession != null || userSession != undefined) {
            if (Math.abs(moment().diff(userSession.lastlogin)) < miliday) {
                this.comefromfastinit = true;
                // Valido
                if (this.holderService.isMock) {
                    // this.getinfonewauthmock();
                } else {
                    // Colocar infos prod
                    this.getinfonewauth();
                }
            } else {
                // Expirado
                localStorage.clear();
            }
        }
    }

    // Validação se usuário e senha foi preenchido
    private userisvalid() {
        let valid: boolean = false;
        if (this.usuario.matricula === null || this.usuario.matricula === undefined || this.usuario.senha === null || this.usuario.senha === undefined) {
            valid = false;
            super.showAlert("Login ou senha Invalidos", super.makeexceptionmessage("Campos de Matricula e Senha não pode ser vazio."))
        } else {
            valid = true;
        }
        return valid;
    }

    // // Mock para validação do usuário
    // public entrarnewauthMock() {
    //     this.loading(true, "Validando Credenciais");
    //     setTimeout(() => {
    //         this.loginService
    //             .entrarnewauthMock(this.usuario)
    //             .then(resposta => {
    //                 this.loading(false);
    //                 if (resposta) {
    //                     this.getinfonewauthmock();
    //                 } else {
    //                     super.showAlert("Credenciais Inválidas", "Login ou senha incorretos, por favor tente novamente.");
    //                     this.usuario.senha = "";
    //                 }
    //             }, error => {
    //                 this.loading(false);
    //                 super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
    //                 this.usuario.senha = "";
    //             });
    //     }, 3000);
    // }

    // // Mock para pegar as informações do usuário
    // private getinfonewauthmock() {
    //     this.loading(true, "Buscando informações do usuário");
    //     setTimeout(() => {
    //         this.loginService
    //             .getuserifosMock()
    //             .then(resposta => {
    //                 this.loading(false);
    //                 this.holderService.user = resposta;
    //                 if (this.loginUtilService.userIsValid(resposta)) {
    //                     this.loginUtilService.setloginstatus(true, resposta.matricula);
    //                 } else {
    //                     // open modal with values
    //                     if (!this.comefromfastinit) {
    //                         setTimeout(() => {
    //                             this.navCtrl.push(UserModifyComponent);
    //                         }, 500);
    //                     } else {
    //                         this.loginUtilService.setloginstatus(true, resposta.matricula);
    //                     }
    //                 }
    //             }, error => {
    //                 this.loading(false);
    //                 super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
    //             });
    //     }, 3000);
    // }

    private getinfonewauth() {
        this.loading(true, "Buscando informações do usuário");
        this.loginService
            .getuserifos(this.usuario)
            .then(resposta => {
                this.loading(false);
                this.holderService.user = resposta;
                if (this.loginUtilService.userIsValid(resposta)) {
                    // this.loginUtilService.setloginstatus(true, resposta.matricula);
                    this.logaruser();
                } else {
                    // open modal with values
                    if (!this.comefromfastinit) {
                        setTimeout(() => {
                            this.navCtrl.push(UserModifyComponent);
                        }, 500);
                    } else {
                        // this.loginUtilService.setloginstatus(true, resposta.matricula);
                        this.logaruser();
                    }
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            });
    }

    private logaruser() {
        this.loading(true, "Validando usuário");
        this.loginService
            .logarusuario(this.usuario)
            .then(resposta => {
                console.log(resposta);
                this.loading(false);
                this.loginUtilService.setloginstatus(true, this.holderService.user.matricula);
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            });
    }

}