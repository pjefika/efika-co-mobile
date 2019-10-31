import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

import { LoadingController, AlertController, NavParams } from 'ionic-angular';
import { LoginUtilService } from '../../../util/login-util/login-util.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { UserModifyService } from './user-modify.service';
import { LoginService } from '../login.service';
import { Usuario } from '../../../view-model/usuario/usuario';

import * as _ from "lodash";

@Component({
    selector: 'user-modify-component',
    templateUrl: 'user-modify.component.html',
    providers: [UserModifyService, LoginService]
})

export class UserModifyComponent extends SuperComponentService implements OnInit {

    // Lista de clusters
    public lclusters: string[];
    // Lista de cidades
    public lcidades: string[];

    public datanasc: string;

    public repeatpassword: string;

    // Mostra e esconde senha no input
    public showHidePassword: boolean = false;

    public comefromfast: boolean = false;

    constructor(private userModifyService: UserModifyService,
        private loginService: LoginService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private loginUtilService: LoginUtilService,
        public holderService: HolderService,
        private navParams: NavParams) {
        super(alertCtrl, loadingCtrl, holderService);
        if (this.navParams.get("comefromfast")) {
            this.comefromfast = this.navParams.get("comefromfast");
        }
        let usuario: Usuario = {
            matricula: this.navParams.get("usuario"),
            senha: this.navParams.get("senha")
        }
        this.setinfosuser(usuario);
    }

    public ngOnInit() {
        // Faz validação para amostragem de mensagem e indicação se cadastro está ok.        
        this.getcluster();
        this.uservalid();
    }

    /**
     * Chamada de tela para atualização do usuário com validação se o mesmo é mock ou produção/qa
     */
    public doUpdate() {
        if (this.holderService.isMock) {
            this.updateusermock();
        } else {
            if (this.comefromfast) {
                this.updateuser();
            } else {
                this.createuser();
            }
        }
    }

    // chamada do serviço para atualização do usuário
    private updateuser() {
        if (this.validpasswordupdate()) {
            this.holderService.user.dateBorn = this.datanasc;
            if (this.uservalid()) {
                this.holderService.user.name = this.holderService.user.name.toUpperCase()
                this.userModifyService
                    .updateuserinfo(this.holderService.user)
                    .then(resposta => {
                        this.holderService.user = resposta;
                        super.showAlert("Sucesso", "Cadastro atualizado com sucesso.");
                        this.repeatpassword = null;
                    }, error => {
                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                    });
            }
        } else {
            super.showAlert("Validação de senha", "Por favor preencha sua senha atual.");
        }
    }

    // chamada do serviço para criação do usuário
    private createuser() {
        if (this.validpassword()) {
            this.holderService.user.dateBorn = this.datanasc;
            if (this.uservalid()) {
                if (!this.holderService.user.groups) {
                    this.holderService.user.groups = [
                        {
                            name: "operador"
                        }
                    ]
                }
                this.userModifyService
                    .createuserinfo(this.holderService.user)
                    .then(resposta => {
                        this.holderService.user = resposta;
                        this.logaruser();
                    }, error => {
                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                    });
            }
        } else {
            super.showAlert("Validação de senha", "As senhas inseridas não coincidem ou não foram preenchidas");
        }
    }

    /**
     * Valida se usuário está completo, caso não o mesmo informa mensagem na tela 
     */
    public uservalid(): boolean {
        let valid = this.loginUtilService.userIsValid(this.holderService.user);
        if (!valid) {
            super.showAlert("Cadastro incompleto", "Por favor preencha todos os campos do seu cadastro e matenha o mesmo sempre atualizado.");
        }
        if (this.holderService.user.dateBorn) {
            this.datanasc = new Date(this.holderService.user.dateBorn).toISOString();
        }
        if (this.comefromfast) {
            this.getcidadeesp(this.holderService.user.cluster);
        }
        return valid;
    }

    // Chamada para busca da lista de clusters.
    public getcluster() {
        this.userModifyService
            .getcluster()
            .then(resposta => {
                this.lclusters = _.sortBy(resposta);
            }, error => {
                super.showAlert(error.tError, error.mError);
            });
    }

    // Chamada para busca da lista de cidades.
    public getcidadeesp(cluster?: string) {
        super.loading(true, "Consultando cidades");
        let c: string;
        if (cluster) {
            c = cluster;
        } else {
            c = this.holderService.user.cluster;
        }
        this.userModifyService
            .getcidadeespcluster(c)
            .then(resposta => {
                this.lcidades = _.sortBy(resposta);
            }, error => {
                super.showAlert(error.tError, error.mError);
            })
            .then(() => {
                super.loading(false);
            });
    }

    /**
     * Valida se campo existe, se o mesmo existir o mesmo ira retornar true caso contrário false.
     * @param value Campo do usuário
     */
    public disableinput(value: string) {
        let valid: boolean = false;
        if (value) {
            valid = true;
        }
        return valid;
    }

    private logaruser() {
        this.loading(true, "Validando usuário");
        let usuario: Usuario = {
            matricula: this.holderService.user.matricula,
            senha: this.holderService.user.password
        }
        this.loginService
            .logarusuario(usuario)
            .then(resposta => {
                console.log(resposta);
                this.loading(false);
                this.loginUtilService.setloginstatus(true, this.holderService.user.matricula, this.holderService.user.password);
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            });
    }

    private validpassword(): boolean {
        let valid: boolean = false;
        if (this.holderService.user.password !== null && this.holderService.user.password !== ""
            && this.repeatpassword !== null && this.repeatpassword !== ""
            && this.holderService.user.password === this.repeatpassword) {
            valid = true;
        }
        return valid;
    }

    private validpasswordupdate(): boolean {
        let valid: boolean = false;
        let userSession = JSON.parse(localStorage.getItem("user"));
        if (this.holderService.user.password === userSession.password) {
            valid = true;
        }
        return valid;
    }

    private setinfosuser(usuario: Usuario) {
        if (usuario.matricula) {
            this.holderService.user.matricula = usuario.matricula;
        }
        if (usuario.senha) {
            this.holderService.user.password = usuario.senha
        }
    }






    // chamada do serviço para atualização do usuário Mock
    private updateusermock() {
        if (this.uservalid()) {
            setTimeout(() => {
                this.userModifyService
                    .updateuserinfomock(this.holderService.user)
                    .then(resposta => {
                        this.holderService.user = resposta;
                        this.loginUtilService.setloginstatus(true, this.holderService.user.matricula, this.holderService.user.password);
                    }, error => {
                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                    });
            }, 3000);
        }
    }

}