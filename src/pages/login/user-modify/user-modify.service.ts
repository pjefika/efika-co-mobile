import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/new_url-service/url.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { UserFull } from '../../../view-model/usuario/userfull';

// declare var require: any

@Injectable()
export class UserModifyService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public createuserinfo(user: UserFull): Promise<UserFull> {
        this.infoResquest = {
            rqst: "post",
            command: "createuserinfo",
            timeout: 10000,
            havetoken: true,
            otherUrl: this.abcsd + "efika/user",
            _data: user
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as UserFull;
            });
    }

    public updateuserinfo(user: UserFull): Promise<UserFull> {
        this.infoResquest = {
            rqst: "put",
            command: "updateuser",
            timeout: 10000,
            havetoken: true,
            otherUrl: this.abcsd + "efika/user",
            _data: user
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as UserFull;
            });
    }

    public updateuserinfomock(user: UserFull): Promise<UserFull> {
        console.log("user mock to update: " + user.matricula);
        let userf: UserFull //= require("../../assets/mocks/login/login.json");
        // let user: User = require("../../assets/mocks/login/loginfull.json");
        return Promise.resolve(userf);
    }

    public getcluster() {
        this.infoResquest = {
            rqst: "get",
            command: "getcluster",
            otherUrl: this.abcsd + "efika/cluster",
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

    public getcidadeespcluster(cluster: string) {
        this.infoResquest = {
            rqst: "get",
            command: "getcidadeespecificocluster",
            otherUrl: this.abcsd + "efika/cidades/",
            timeout: 10000,
            havetoken: true,
            _data: cluster
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

}