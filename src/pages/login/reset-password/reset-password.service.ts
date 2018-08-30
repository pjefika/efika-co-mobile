import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/new_url-service/url.service';
import { HolderService } from '../../../providers/holder/holder.service';

@Injectable()
export class ResetPasswordService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public resetpassword(matricula: string, cpf: string, senha: string): Promise<boolean> {
        let user: { matricula: string, cpf: string, password: string };
        user = { matricula: matricula, cpf: cpf, password: senha };
        this.infoResquest = {
            rqst: "put",
            command: "resetuser",
            timeout: 10000,
            otherUrl: this.abcsd + "efika/user/password",
            _data: user
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as boolean;
            });
    }
}