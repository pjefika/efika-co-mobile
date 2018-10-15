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
            if (user.matricula === null || user.matricula === "" ||
                user.name === null || user.name === "" ||
                user.email === null || user.email === "" ||
                user.cpf === null || user.cpf === "" ||
                // user.user.sector ||
                user.phone === null || user.phone === "" ||
                user.cidade === null || user.cidade === "" ||
                user.cluster === null || user.cluster === "" ||
                user.dateBorn === null || user.dateBorn === "" || user.dateBorn === undefined) {
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
    public setloginstatus(value: boolean, matricula?: string, passowrd?: string) {
        this.holderService.estalogado = value;
        this.holderService.showhidetab = value;
        if (value) {
            let dateLastLogin: Date = new Date();
            localStorage.setItem("user", JSON.stringify({ user: matricula, password: passowrd, lastlogin: dateLastLogin }));
        } else {
            localStorage.clear();
        }
    }

}