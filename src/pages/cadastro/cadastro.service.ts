import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/url-service/url.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';

@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getCadastro(instancia: string) {
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: "ionicTest" };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            timeout: 63000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }


}