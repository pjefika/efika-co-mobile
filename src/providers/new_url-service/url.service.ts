import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { HolderService } from '../holder/holder.service';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { LinkService } from './link.service';
import { LinksEndPoits } from '../../view-model/url-service/links-end-points';

import 'rxjs/add/operator/timeout';

@Injectable()
export class UrlService extends LinkService {

    public urlIpProd = "http://54.94.208.183"  // -- Produção
    public urlIpQA = "http://10.40.196.172"; // --QA 

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });

    private ftypename: string;
    private portLink: number;

    constructor(private http: Http,
        public holderService: HolderService) {
        super(holderService);
    }

    public request(infoResquest: InfoRequest) {
        switch (infoResquest.rqst) {
            case "get":
                return this.get(infoResquest);
            case "post":
                return this.post(infoResquest);
        }
    }

    private post(infoResquest: InfoRequest) {
        return this.http.post(this.mountUrl(infoResquest.otherUrl, "set", infoResquest.command), JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(super.handleErrorKing);
    }

    private get(infoResquest: InfoRequest) {
        return this.http.get(this.mountUrl(infoResquest.otherUrl, "get", infoResquest.command + infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private mountUrl(l, ftype: string, command: string): string {
        if (l) {
            return l;
        } else {
            let le = super.getLinksEndPoints();
            switch (ftype) {
                case "get":
                    if (this.ftypename) {
                        if (this.ftypename === le[0].nome) {
                            this.ajustLink(le[1]);
                        } else {
                            this.ajustLink(le[0]);
                        }
                    } else {
                        this.ajustLink(le[0]);
                    }
                    break;
                case "set":
                    if (this.ftypename) {
                        if (this.ftypename === le[2].nome) {
                            this.ajustLink(le[3]);
                        } else {
                            this.ajustLink(le[2]);
                        }
                    } else {
                        this.ajustLink(le[2]);
                    }
                    break;
            }
            let u = this.returnLink(command);
            return u;
        }
    }

    private returnLink(command: string) {
        if (this.holderService.isLinkProd) {
            return super.contacMountUrl(this.urlIpProd, this.portLink, command);
        } else {
            return super.contacMountUrl(this.urlIpQA, this.portLink, command);
        }
    }

    private ajustLink(linksEndPoits: LinksEndPoits) {
        this.ftypename = linksEndPoits.nome;
        this.portLink = linksEndPoits.port;
    }


}