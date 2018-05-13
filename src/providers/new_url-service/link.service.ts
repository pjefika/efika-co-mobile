import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';
import { LinksEndPoits } from '../../view-model/url-service/links-end-points';

declare var require: any;

@Injectable()
export class LinkService extends SuperService {

    constructor() {
        super();
    }

    public getLinksEndPoints(): LinksEndPoits[] {
        let linksEndPoits: LinksEndPoits[] = require("../../assets/json/links-end-points.json");
        return linksEndPoits;
    }

    public contacMountUrl(url, port, command): string {
        return url + ":" + port + "/queueAPI/" + command;
    }
}