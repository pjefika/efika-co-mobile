import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';

@Injectable()
export class LoginService {

    constructor() { }

    public entrarMock(usuario: Usuario): boolean {

        if (usuario.matricula === "G0034481" && usuario.senha === "123") {
            return true;
        } else {
            return false;
        }

    }

}