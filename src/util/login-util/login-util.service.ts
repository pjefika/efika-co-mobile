import { Injectable } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';
import { UserFull } from '../../view-model/usuario/userfull';

@Injectable()
export class LoginUtilService {

    constructor(public holderService: HolderService) { }

    /**
     * Valida se o mesmo já esta logado com base nas informações do objeto user da LocalStorage, retornando booleano. 
     */
    public isLogado(): boolean {
        let valid: boolean = false;
        if (localStorage.getItem('user')) {
            valid = true
        }
        return valid;
    }

    /**
     * Recebe um usuário e valida se o mesmo possui todos os campos necessários para proceguir, retornando um booleano.
     * @param user Usuário completo
     */
    public userIsValid(user: UserFull): boolean {
        let valid: boolean = true;
        if (user) {
            if (user.matricula === null ||
                user.name === null ||
                user.email === null ||
                user.cpf === null ||
                // user.user.sector ||
                user.phone === null ||
                user.cidade === null ||
                user.cluster === null ||
                user.dateBorn === null) {
                valid = false;
            }
        }
        return valid;
    }

    /**
    * 
    * @param value (true/false) valor booleano para dizer se está logado ou não;
    * @param user (matricula) passar usuário para ser colocado na sessão
    * Função que adiciona sessão para o usuário e envia para component principal.
    */
    public setloginstatus(value: boolean, user: string) {
        localStorage.setItem("user", JSON.stringify({ user: user }));
        this.holderService.estalogado = value;
        this.holderService.showhidetab = value;
    }

}