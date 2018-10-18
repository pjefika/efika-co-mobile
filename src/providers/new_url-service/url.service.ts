import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { HolderService } from '../holder/holder.service';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { LinkService } from './link.service';

import 'rxjs/add/operator/timeout';

@Injectable()
export class UrlService extends LinkService {

    public urlIpProd = "http://54.94.208.183:8080/"  // -- Produção
    public urlIpQA = "http://10.40.196.172:9091/"; // --QA 

    public options;

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
        return this.http.post(this.returnLink(infoResquest), JSON.stringify(infoResquest._data), this.options)
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
        return this.http.put(this.returnLink(infoResquest), JSON.stringify(infoResquest._data), this.options)
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
        return this.http.get(this.returnLink(infoResquest), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private returnLink(infoResquest: InfoRequest) {
        if (infoResquest.otherUrl) {
            let ol: string = infoResquest.otherUrl;
            if (infoResquest._data && infoResquest.rqst === "get") {
                ol = ol + infoResquest._data;
            }
            return ol;
        } else {
            if (this.holderService.isLinkProd) {
                if (infoResquest.rqst === "get" && infoResquest._data) {
                    return super.contacMountUrl(this.urlIpProd, infoResquest.command + infoResquest._data);
                } else {
                    return super.contacMountUrl(this.urlIpProd, infoResquest.command);
                }
            } else {
                if (infoResquest.rqst === "get" && infoResquest._data) {
                    return super.contacMountUrl(this.urlIpQA, infoResquest.command + infoResquest._data);
                } else {
                    return super.contacMountUrl(this.urlIpQA, infoResquest.command);
                }
            }
        }
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