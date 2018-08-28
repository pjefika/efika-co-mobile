import { Injectable } from '@angular/core';
import { CheckVersion } from '../../view-model/version/checkversion';
/**
 * Serviço contendo as validações e traduções das exceções do backend/navegador.
 */
@Injectable()
export class ExceptionService {

    constructor() { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    /**
     * Monta a mensagem de erro de acordo com retorno do backend/navegador
     * Validando se o mesmo está com internet, se foi timeout e validando de acordo com os códigos dos status 400>/500>
     * @param error Objeto de retorno do backend/navegador
     */
    public handleErrorKing(error: any): Promise<any> {
        let er: any;
        if (!navigator.onLine) {
            er = {
                tError: "Sem Conexão. Cod.20",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente."
            }
            console.log(er);
            return Promise.reject(er);
        }
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido. Cod.10",
                mError: "Tempo de busca excedido, por favor realize a busca novamente. "
            }
            console.log(er);
            return Promise.reject(er);
        }
        if (error.status >= 500 || error.status === 0) {
            console.log(error);
            switch (error.status) {
                case 503:
                    er = {
                        tError: "Ops, Aconteceu algo. Cod.30.1",
                        mError: "Serviço Indisponível, caso problema persista por favor entrar em contato com o administrador do sistema."
                    }
                    break;
                case 0:
                    er = {
                        tError: "Erro (\"Requisição invalida\"). Cod.30.1",
                        mError: "Não foi possivel realizar requisição podendo ser um possivel problema de conexão, por favor verifique."
                    }
                    break;
                default:
                    let casterror = error.json();
                    er = {
                        tError: "Ops, Aconteceu algo. Cod.30",
                        mError: "Erro: " + casterror.message
                    }
                    break;
            }
            console.log(er);
            return Promise.reject(er);
        }
        if (error.status >= 400 && error.status < 500) {
            switch (error.status) {
                case 400:
                    let error400 = error.json();
                    if (error400.msg) {
                        er = {
                            tError: "Credenciais Inválidas",
                            mError: "Login ou senha incorretos, por favor tente novamente."
                        }
                    } else {
                        er = {
                            tError: "Erro (\"Solicitação Inválida\"). Cod.20.1",
                            mError: "Houve um problema ao realizar Request, sua solicitação é invalida."
                        }
                    }
                    break;
                case 401:
                    er = {
                        tError: "Erro (\"Solicitação Negada\"). Cod.20.2",
                        mError: "Não autorizado, por favor verifique suas credenciais."
                    }
                    break;
                case 404:
                    er = {
                        tError: "Erro (\"Página não encontrada\"). Cod.20.3",
                        mError: "Houve um problema ao realizar Request a página não foi encontrada, por favor contate o administrador do sistema."
                    }
                    break;
                case 405:
                    er = {
                        tError: "Erro (\"Método não permitido\"). Cod.20.4",
                        mError: "Houve um problema ao realizar Request, o método que está sendo executado não é permitido."
                    }
                    break;
                case 407:
                    er = {
                        tError: "Erro (\"Proxy\"). Cod.20.5",
                        mError: "Houve um problema ao realizar Request, por causa das configurações de seu proxy por favor verifique seu Proxy, e tente novamente."
                    }
                    break;
                default:
                    let casterror = error.json();
                    er = {
                        tError: "Erro Cod.20.7",
                        mError: "Erro: " + casterror.message
                    }
                    break;
            }
            console.log(er);
            return Promise.reject(er);
        }
    }

    /**
     * Monta informações de data/instância/versão do horario da exceção.
     * @param instancia Número do cliente (se possuir)
     */
    public mountmsgexception(instancia?: string): string {
        let version: string = CheckVersion.VERSION;
        let datenow: Date = new Date();
        let msgconcat: string;
        if (instancia) {
            msgconcat = " " + datenow.toLocaleDateString() + " " + datenow.toLocaleTimeString() + " Instância: " + instancia + " versão: " + version;
        } else {
            msgconcat = " " + datenow.toLocaleDateString() + " " + datenow.toLocaleTimeString() + " versão: " + version;
        }
        return msgconcat;
    }

    /**
     * Monta corpo completo da mensagem concatenando as informações da função mountmsgexception()
     * @param message Mensagem da exceção
     * @param instancia Número do cliente (se possuir)
     */
    public makeexceptionmessage(message: string, instancia?: string): string {
        let returnmsg: string;
        if (instancia) {
            returnmsg = message + this.mountmsgexception(instancia);
        } else {
            returnmsg = message + this.mountmsgexception();
        }
        return returnmsg;
    }

    /**
     * Monta titulo da mensagem
     * @param title Titulo da mensagem
     * @param iserror booleano informando se o mesmo é um erro
     */
    public makeexceptionmessageTitle(title: string, iserror: boolean) {
        let mounttile: string;
        if (iserror) {
            mounttile = title + " Cod.30";
        } else {
            mounttile = title;
        }
        return mounttile;
    }

    /**
     * Pega informações de versão do sistema.
     */
    public getVersion() {
        let version: string = CheckVersion.VERSION;
        return version;
    }

}