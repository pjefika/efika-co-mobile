import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {

    public usuario = new Usuario();

    private ativo: boolean = false;
    private titulo: string;
    private mensagem: string;
    private tipo: string;

    constructor(private loginService: LoginService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController) { }

    public ngOnInit() {
        // this.usuario.matricula = "G0034481";
        // this.usuario.senha = "123"
    }

    public entrar() {
        let carregando = this.loadingCtrl.create({
            content: "Consultando Login"
        });
        carregando.present();
        this.loginService
            .entrar(this.usuario)
            .then(response => {
                let verify: boolean;
                verify = response.output.match;
                if (verify) {
                    this.holderService.estalogado = verify;
                } else {
                    this.showError(true, "erro", "Erro ao realizar login", "Login ou senha incorretos, por favor tente novamente.");
                    this.usuario.matricula = "";
                    this.usuario.senha = "";
                }
            }, error => {
                this.showError(true, "erro", "Erro ao realizar login", "Ocorreu um erro ao realizar busca de login.");
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
            this.holderService.estalogado = verify;
        } else {
            this.ativo = true;
            this.tipo = "erro";
            this.titulo = "Erro ao realizar login";
            this.mensagem = "Login ou senha incorretos, por favor tente novamente.";
            this.usuario.matricula = "";
            this.usuario.senha = "";
        }
    }

    private showError(ativo: boolean, tipo: string, titulo: string, mensagem: string) {
        this.ativo = ativo;
        this.tipo = tipo;
        this.titulo = titulo;
        this.mensagem = mensagem;
    }

}