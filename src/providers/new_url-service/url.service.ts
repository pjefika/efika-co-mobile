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

    public options;

    private ftypename: string;
    private portLink: number;

    constructor(private http: Http,
        public holderService: HolderService) {
        super(holderService);
    }

    public request(infoResquest: InfoRequest) {
        let headers = new Headers({});
        headers.set("Content-Type", "application/json");
        if (infoResquest.havetoken) {
            headers.set("Authorization", this.holderService.headerToken);
        }
        this.options = new RequestOptions({ headers });
        switch (infoResquest.rqst) {
            case "post":
                return this.post(infoResquest);
            case "get":
                return this.get(infoResquest);
            case "put":
                return this.put(infoResquest);
        }
    }

    private post(infoResquest: InfoRequest): Promise<any> {
        return this.http.post(this.mountUrl(infoResquest), JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                if (infoResquest.gettoken) {
                    this.settoken(response.headers);
                }
                return response.json();
            })
            .catch(super.handleErrorKing);
    }

    private put(infoResquest: InfoRequest): Promise<any> {
        return this.http.put(this.mountUrl(infoResquest), JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                if (infoResquest.gettoken) {
                    this.settoken(response.headers);
                }
                return response.json();
            })
            .catch(super.handleErrorKing);
    }

    private get(infoResquest: InfoRequest): Promise<any> {
        return this.http.get(this.mountUrl(infoResquest), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private mountUrl(infoResquest: InfoRequest): string {
        if (infoResquest.otherUrl) {
            let ol: string = infoResquest.otherUrl;
            if (infoResquest._data && infoResquest.rqst === "get") {
                ol = ol + infoResquest._data;
            }
            return ol;
        } else {
            let le = super.getLinksEndPoints();
            switch (infoResquest.rqst) {
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
                case "post":
                    this.ajustLink(le[2]);
                    break;
            }
            let u = this.returnLink(infoResquest);
            return u;
        }
    }

    private returnLink(infoResquest: InfoRequest) {
        if (this.holderService.isLinkProd) {
            if (infoResquest.rqst === "get" && infoResquest._data) {
                return super.contacMountUrl(this.urlIpProd, this.portLink, infoResquest.command + infoResquest._data);
            } else {
                return super.contacMountUrl(this.urlIpProd, this.portLink, infoResquest.command);
            }
        } else {
            return super.contacMountUrl(this.urlIpQA, this.portLink, infoResquest.command);
        }
    }

    private ajustLink(linksEndPoits: LinksEndPoits) {
        this.ftypename = linksEndPoits.nome;
        this.portLink = linksEndPoits.port;
    }

    public getIpEthernet() {
        return this.http.get("https://jsonip.com")
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(super.handleErrorKing);
    }

    private settoken(header: Headers) {
        // console.log(header.get("authorization"));
        this.holderService.headerToken = header.get("authorization");
    }
}