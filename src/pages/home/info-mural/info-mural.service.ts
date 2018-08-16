import { Injectable } from '@angular/core';
import { InfoMural } from '../../../view-model/mural/mural';
import { SuperService } from '../../../providers/super-service/super.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { UrlService } from '../../../providers/new_url-service/url.service';

declare var require: any

@Injectable()
export class InfoMuralService extends SuperService {


    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public getInfoMuralMock(): Promise<InfoMural[]> {
        let info: InfoMural[] = require("../../../assets/mocks/mural/info-mural.json");
        return Promise.resolve(info);
    }

    public getInfoMural(): Promise<InfoMural[]> {
        this.infoResquest = {
            rqst: "get",
            otherUrl: "http://10.40.196.171:8085/notificacao/getall",
            command: "Efika Info Mural",
            timeout: 5000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as InfoMural[];
            });
    }

}