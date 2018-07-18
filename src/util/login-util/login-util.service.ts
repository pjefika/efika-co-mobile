import { Injectable } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario_N } from '../../view-model/usuario/usuario_n';

@Injectable()
export class LoginUtilService {

    constructor(public holderService: HolderService) { }

    public isLogado(): boolean {
        if (localStorage.getItem('user')) {
            return true
        }
        return false;
    }

    public userIsValid(usuario_N: Usuario_N): boolean {
        let valid: boolean = true;
        if (usuario_N) {
            if (usuario_N.id === null ||
                usuario_N.matricula === null ||
                usuario_N.nome === null ||
                usuario_N.email === null ||
                usuario_N.cpf === null ||
                usuario_N.area === null ||
                usuario_N.perfis === null) {
                valid = false;
            }
        }

        return valid;
    }

}