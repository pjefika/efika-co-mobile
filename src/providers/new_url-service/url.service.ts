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

    private count: number = 0;

    private url: string;

    constructor(private http: Http,
        public holderService: HolderService) {
        super();
    }

    public request(infoResquest: InfoRequest) {
        this.count = 0;
        switch (infoResquest.rqst) {
            case "get":
                this.mountUrl(infoResquest.otherUrl, "get", infoResquest.command) + this.mountlinkget(infoResquest);
                return this.get(infoResquest);
            case "post":
                this.url = this.mountUrl(infoResquest.otherUrl, "set", infoResquest.command);
                return this.post(infoResquest);
        }
    }

    private post(infoResquest: InfoRequest) {
        let idtask: string;
        return this.http.post(this.url, JSON.stringify(infoResquest._data), this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                let responsejson = response.json();
                idtask = responsejson.id;
                let ir: InfoRequest = this.mountInfoRequestForGet(idtask);
                return this.startgettask(ir);
            })
            .catch(super.handleErrorKing);
    }

    private startgettask(infoResquest: InfoRequest) {
        let interval = setInterval(() => {
            this.mountUrl(infoResquest.otherUrl, "get", infoResquest.command) + this.mountlinkget(infoResquest);
            if (this.count < 5) {
                this.get(infoResquest)
                    .then(respostaget => {
                        this.count++;
                        let respostagetjson = respostaget.json();
                        if (respostagetjson.state === "EXECUTED") {
                            clearInterval(interval);
                            return respostagetjson;
                        }
                    });
            }
        }, 30000);
    }

    private mountInfoRequestForGet(id): InfoRequest {
        let ir: InfoRequest;
        ir = {
            rqst: "get",
            command: "queueAPI/task/",
            _data: id,
            timeout: 10000
        }
        return ir;
    }

    private get(infoResquest: InfoRequest) {
        return this.http.get(this.url, this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private mountlinkget(infoResquest: InfoRequest): string {
        if (infoResquest._data) {
            return infoResquest.command + infoResquest._data;
        } else {
            return infoResquest.command;
        }
    }

    private mountUrl(l, ftype: string, command: string): string {
        if (l) {
            return l;
        } else {
            console.log("entrou no else");
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
                    console.log("entrou no case set");
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
            let u = this.returnLink(command)
            console.log(u);
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