import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { HolderService } from '../../providers/holder/holder.service';
import { UrlService } from '../../providers/new_url-service/url.service';

@Injectable()
export class VersionService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public getSpectedSystemVersion(): Promise<any> {
        this.infoResquest = {
            rqst: "get",
            otherUrl: "http://54.94.208.183/mobile-version.json",
            command: "Mobile Global Version",
            timeout: 5000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                console.log(resposta);
                return resposta
            });
    }

}