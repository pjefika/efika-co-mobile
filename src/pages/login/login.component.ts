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

    public usuario = new Usuario;

    constructor(private loginService: LoginService,
        public holderService: HolderService) { }

    public ngOnInit() { }

    public entrarMock() {
        console.log(this.usuario);

        this.holderService.estalogado = this.loginService.entrarMock(this.usuario);
    }

}