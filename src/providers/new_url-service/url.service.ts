import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { HolderService } from '../holder/holder.service';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { LinkService } from './link.service';
import { LinksEndPoits } from '../../view-model/url-service/links-end-points';

@Injectable()
export class UrlService extends LinkService {

    public urlIpProd = "http://54.94.208.183"  // -- Produção
    public urlIpQA = "http://10.40.196.172"; // --QA 

    private headersAppJson = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headersAppJson });

    private ftypename: string;
    private portLink: number;

    private count: number = 0;

    constructor(private http: Http,
        public holderService: HolderService) {
        super();
    }

    public request(infoResquest: InfoRequest) {
        this.count = 0;
        switch (infoResquest.rqst) {
            case "get":
                return this.get(infoResquest);
            case "post":
                return this.post(infoResquest);
        }
    }

    private post(infoResquest: InfoRequest) {
        let idtask: string;
        const url = this.mountUrl(infoResquest.otherUrl, "set", infoResquest.command);
        return this.http.post(url, JSON.stringify(infoResquest._data), this.options)
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
        let rstlink;
        if (infoResquest._data) {
            rstlink = infoResquest.command + infoResquest._data;
        } else {
            rstlink = infoResquest.command;
        }
        const url = this.mountUrl(infoResquest.otherUrl, "get", infoResquest.command) + rstlink;
        return this.http.get(url, this.options)
            .timeout(infoResquest.timeout)
            .toPromise()
            .then(response => {
                return response.json()
            })
            .catch(super.handleErrorKing);
    }

    private mountUrl(l, ftype: string, command: string) {
        if (l) {
            return l;
        } else {
            // this.setftypeInUrl(ftype);
            super.getLinksEndPoints()
                .then(resposta => {
                    switch (ftype) {
                        case "get":
                            if (this.ftypename) {
                                if (this.ftypename === resposta[0].nome) {
                                    this.ajustLink(resposta[1]);
                                } else {
                                    this.ajustLink(resposta[0]);
                                }
                            } else {
                                this.ajustLink(resposta[0]);
                            }
                            break;
                        case "set":
                            if (this.ftypename) {
                                if (this.ftypename === resposta[2].nome) {
                                    this.ajustLink(resposta[3]);
                                } else {
                                    this.ajustLink(resposta[2]);
                                }
                            } else {
                                this.ajustLink(resposta[2]);
                            }
                            break;
                    }
                })
                .then(() => {
                    this.returnLink(command);
                });
        }
    }

    private returnLink(command: string) {
        if (this.holderService.isLinkProd) {
            return super.contacMountUrl(this.urlIpProd, this.portLink, command);
        } else {
            console.log(super.contacMountUrl(this.urlIpQA, this.portLink, command));
            return super.contacMountUrl(this.urlIpQA, this.portLink, command);
        }
    }

    private ajustLink(linksEndPoits: LinksEndPoits) {
        this.ftypename = linksEndPoits.nome;
        this.portLink = linksEndPoits.port;
    }


}