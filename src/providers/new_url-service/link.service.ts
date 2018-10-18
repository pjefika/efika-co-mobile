import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';
import { LinksEndPoits } from '../../view-model/url-service/links-end-points';
import { HolderService } from '../holder/holder.service';

declare var require: any;

@Injectable()
export class LinkService extends SuperService {

    constructor(public holderService: HolderService) {
        super(holderService);
    }

    public getLinksEndPoints(): LinksEndPoits[] {
        let linksEndPoits: LinksEndPoits[] = require("../../assets/json/links-end-points.json");
        return linksEndPoits;
    }

    public contacMountUrl(url, command): string {
        let u = url + "/task/" + command;
        return u;
    }
}