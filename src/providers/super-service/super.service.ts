import { Injectable } from '@angular/core';
import { InfoRequest } from '../../view-model/url-service/info-request';

@Injectable()
export class SuperService {

    public infoResquest: InfoRequest;

    constructor() {
    }
    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public handleErrorKing(error: any): Promise<any> {
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Tempo Excedido.",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else if (!error.ok) {
            er = {
                tError: "Sem Conexão.",
                mError: "Sem conexão com a internet, por favor verifique sua rede e tente novamente."
            }
        } else {
            let erJson: any;
            erJson = error.json();
            er = {
                tError: "Ops, Aconteceu algo.",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }

}