import { Injectable } from '@angular/core';

import { SuperService } from '../../providers/super-service/super.service';
import { HolderService } from '../../providers/holder/holder.service';
import { UrlService } from '../../providers/new_url-service/url.service';
import { IndexValidations } from '../../view-model/index-validations/index-validations';

@Injectable()
export class IndexValidationsService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public getInfosSystem(): Promise<IndexValidations> {
        this.infoResquest = {
            rqst: "get",
            otherUrl: "http://54.94.208.183/efika-mobile-infos.json",
            command: "Mobile Global Version",
            timeout: 5000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                // console.log(resposta);
                return resposta as IndexValidations;
            });
    }

    public getIpEthernet() {
        return this.urlService
            .getIpEthernet()
            .then(resposta => {
                return resposta;
            })
    }

}