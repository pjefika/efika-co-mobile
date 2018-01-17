import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario } from '../../view-model/usuario/usuario';

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
        public holderService: HolderService) { }

    public ngOnInit() { 
        // this.usuario.matricula = "G0034481";
        // this.usuario.senha = "123"
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

}