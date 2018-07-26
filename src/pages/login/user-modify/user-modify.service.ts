import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/new_url-service/url.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { Usuario_N } from '../../../view-model/usuario/usuario_n';

@Injectable()
export class UserModifyService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public updateuserinfo(usuario_n: Usuario_N): Promise<Usuario_N> {
        this.infoResquest = {
            rqst: "post",
            command: "updateuser",
            timeout: 10000,
            havetoken: true,
            otherUrl: "http://10.40.196.171:8080/auth/usuario/update",
            _data: usuario_n
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as Usuario_N;
            });
    }

}