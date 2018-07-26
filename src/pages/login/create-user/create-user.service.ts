import { Injectable } from '@angular/core';

import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/new_url-service/url.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { UsuarioCreate } from '../../../view-model/usuario/usuario_create';

@Injectable()
export class CreateUserService extends SuperService {

    // 8989 porta

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public pediracesso(usuarioCreate: UsuarioCreate) {
        this.infoResquest = {
            rqst: "post",
            command: "pediracesso",
            otherUrl: "http://54.94.208.183:8084/auth/create",
            timeout: 10000,
            _data: usuarioCreate
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

    public getcluster() {
        this.infoResquest = {
            rqst: "get",
            command: "getcluster",
            otherUrl: "http://54.94.208.183:8084/auth/cluster/cluster",
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

    public getcidadeespcluster(cluster: string) {       
        this.infoResquest = {
            rqst: "get",
            command: "getcidadeespecificocluster",
            otherUrl: "http://54.94.208.183:8084/auth/cluster/cidades/",
            timeout: 10000,
            _data: cluster
        }        
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

}