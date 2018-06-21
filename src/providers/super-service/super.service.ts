import { Injectable } from '@angular/core';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { HolderService } from '../holder/holder.service';
import { CheckVersion } from '../../view-model/version/checkversion';

@Injectable()
export class SuperService {

    public infoResquest: InfoRequest;

    constructor(public holderService: HolderService) { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public handleErrorKing(error: any): Promise<any> {
        let version: string = CheckVersion.VERSION;
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido.",
                mError: "Tempo de busca excedido, por favor realize a busca novamente. " + this.mountmsgexception()
            }
        } else if (!error.ok) {
            er = {
                tError: "Sem Conexão.",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente." + " versão: " + version
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "Ops, Aconteceu algo.",
                mError: erJson.message + " versão: " + version
            }
        }
        return Promise.reject(er);
    }

    public mountmsgexception(instancia?: string): string {
        let version: string = CheckVersion.VERSION;
        let datenow: Date = new Date();
        let msgconcat: string;
        if (instancia) {
            msgconcat = " " + datenow.toLocaleDateString() + datenow.toLocaleTimeString() + " Instância: " + instancia + " versão: " + version;
        } else {
            msgconcat = " " + datenow.toLocaleDateString() + datenow.toLocaleTimeString() + " versão: " + version;
        }
        console.log(msgconcat);


        return msgconcat;
    }

}