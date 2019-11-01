import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';
import { RequestAction } from './url-service.interface';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/timeout'
import { HolderService } from '../holder/holder.service';

@Injectable()
export class UrlService extends SuperService implements RequestAction {

    // public urlIpProd = "http://ec2-54-233-253-253.sa-east-1.compute.amazonaws.com:8080/"; // -- Produção Old
    public urlIpProd = "http://54.94.208.183:8080/"  // -- Produção
    public urlIpQA = "http://10.40.196.172:8080/"; // --QA // 7175

    // public pathStealerAPI = "stealerAPI/"; // stealerAPI_qa
    // public pathFulltestAPI = "fulltestAPI/";
    public queueAPI = "queueAPI/";

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });

    private url;

    constructor(private http: Http,
        public holderService: HolderService) {
        super(holderService);
    }

    public request(infoResquest: InfoRequest) {
        this.hOtherUrl(infoResquest.otherUrl);
        switch (infoResquest.rqst) {
            case "get":
                return this.get(infoResquest);
            case "post":
                return this.post(infoResquest);
        }
    }

    public post(infoResquest: InfoRequest) {

        const url = `${this.url}` + infoResquest.command;

        return this.http.post(url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(super.handleErrorKing);
    }

    public get(infoResquest: InfoRequest) {
        let rstlink;
        if (infoResquest._data) {
            rstlink = infoResquest.command + infoResquest._data;
        } else {
            rstlink = infoResquest.command;
        }
        const url = `${this.url}` + rstlink;
        return this.http.get(url, this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private hOtherUrl(l) {
        if (l) {
            this.url = l;
        } else {
            if (this.holderService.isLinkProd) {
                this.url = this.urlIpProd;
            } else {
                this.url = this.urlIpQA;
            }
        }
    }

}