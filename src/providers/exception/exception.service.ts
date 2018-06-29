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
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido. Cod.10",
                mError: "Tempo de busca excedido, por favor realize a busca novamente. "
            }
        } else if (!error.ok) {
            er = {
                tError: "Sem Conexão. Cod.20",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "Ops, Aconteceu algo. Cod.30",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
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

    public getVersion() {
        let version: string = CheckVersion.VERSION;
        return version;
    }
    
}