import { Injectable } from '@angular/core';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { HolderService } from '../holder/holder.service';

declare var require: any

@Injectable()
export class SuperService {

    public infoResquest: InfoRequest;

    constructor(public holderService: HolderService) { }

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public handleErrorKing(error: any): Promise<any> {
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido.",
                mError: "Tempo de busca excedido, por favor realize a busca novamente. " + this.mountmsgexception() + " versão: " + this.getVersion()
            }
        } else if (!error.ok) {
            er = {
                tError: "Sem Conexão.",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente." + " versão: " + this.getVersion()
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "Ops, Aconteceu algo.",
                mError: erJson.message + " versão: " + this.getVersion()
            }
        }
        return Promise.reject(er);
    }

    private mountmsgexception(): string {
        let datenow: Date = new Date();
        let msgconcat: string;
        if (this.holderService.instancia) {
            msgconcat = "Data: " + datenow.toLocaleDateString() + " Instância: " + this.holderService.instancia;
        } else {
            msgconcat = "Data: " + datenow.toLocaleDateString();
        }
        return msgconcat;
    }

    public getVersion() {
        const { version: appVersion } = require("../../../package.json"); // Versão da aplicação na package.json
        return appVersion;
    }

}