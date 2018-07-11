import { Injectable } from '@angular/core';
import { CheckVersion } from '../../view-model/version/checkversion';

@Injectable()
export class ExceptionService {

    constructor() { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public handleErrorKing(error: any): Promise<any> {
        let er: any;
        if (!navigator.onLine) {
            er = {
                tError: "Sem Conexão. Cod.20",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente."
            }
            return Promise.reject(er);
        }
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido. Cod.10",
                mError: "Tempo de busca excedido, por favor realize a busca novamente. "
            }
            return Promise.reject(er);
        }
        if (error.status === 0) {            
            er = {
                tError: "Servidor Cod.30",
                mError: "Houve um problema de conexão com nossos servidores por favor aguarde um momento e tente novamente."
            }
            console.log(er);
            return Promise.reject(er);
        }
        if (error.status >= 400 && error.status < 500) {
            switch (error.status) {
                case 400:
                    er = {
                        tError: "Erro (\"Solicitação Inválida\"). Cod.20.1",
                        mError: "Houve um problema ao realizar Request, sua solicitação é invalida."
                    }
                    break;
                case 404:
                    er = {
                        tError: "Erro (\"Página não encontrada\"). Cod.20.2",
                        mError: "Houve um problema ao realizar Request a página não foi encontrada, por favor contate o administrador do sistema."
                    }
                    break;
                case 405:
                    er = {
                        tError: "Erro (\"Método não permitido\"). Cod.20.3",
                        mError: "Houve um problema ao realizar Request, o método que está sendo executado não é permitido."
                    }
                    break;
                case 407:
                    er = {
                        tError: "Erro (\"Proxy\"). Cod.20.4",
                        mError: "Houve um problema ao realizar Request, por causa das configurações de seu proxy por favor verifique seu Proxy, e tente novamente."
                    }
                    break;
                default:
                    er = {
                        tError: "Erro Cod.20.5",
                        mError: "Erro: " + error.message
                    }
                    break;
            }
            console.log(er);
            return Promise.reject(er);
        }
        if (error.status >= 500) {
            console.log(error);
            switch (error.status) {
                case 500:
                    er = {
                        tError: "Ops, Aconteceu algo. Cod.30",
                        mError: error.localizedMessage
                    }
                    break;
                case 503:
                    er = {
                        tError: "Ops, Aconteceu algo. Cod.30.1",
                        mError: "Serviço Indisponível, caso problema persista por favor entrar em contato com o administrador do sistema."
                    }
                    break;
                default:
                    er = {
                        tError: "Ops, Aconteceu algo. Cod.30.2",
                        mError: "Erro: " + error.localizedMessage
                    }
                    break;
            }
            return Promise.reject(er);
        }
    }

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

    public makeexceptionmessage(message: string, instancia?: string): string {
        let returnmsg: string;
        if (instancia) {
            returnmsg = message + this.mountmsgexception(instancia);
        } else {
            returnmsg = message + this.mountmsgexception();
        }
        return returnmsg;
    }

    public makeexceptionmessageTitle(title: string, iserror: boolean) {
        let mounttile: string;
        if (iserror) {
            mounttile = title + " Cod.30";
        } else {
            mounttile = title;
        }
        return mounttile;
    }

    public getVersion() {
        let version: string = CheckVersion.VERSION;
        return version;
    }

}