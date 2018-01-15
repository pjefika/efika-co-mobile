import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';
import { RequestAction } from './url-service.interface';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { Headers, RequestOptions, Http } from '@angular/http';

@Injectable()
export class UrlService extends SuperService implements RequestAction {

    public urlIp = "http://10.40.195.81:8080/";

    public pathStealerAPI = "stealerAPI/"; // stealerAPI_qa

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });
    private url;

    constructor(private http: Http) {
        super();
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
            .toPromise()
            .then(response => {
                return response.json()
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
            this.url = this.urlIp;
        }
    }

}