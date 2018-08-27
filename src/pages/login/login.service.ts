import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { UserFull } from '../../view-model/usuario/userfull';

declare var require: any

@Injectable()
export class LoginService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public entrarnewauthMock(usuario: Usuario): Promise<boolean> {
        if (usuario.matricula === "1" && usuario.senha === "1") {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    public getuserifosMock(): Promise<UserFull> {
        let userf: UserFull = require("../../assets/mocks/login/login.json");
        // let user: User = require("../../assets/mocks/login/loginfull.json");
        return Promise.resolve(userf);
    }

    public logarusuario(usuario: Usuario): Promise<boolean> {
        let _d: { username: string, password: string };
        _d = { username: usuario.matricula, password: usuario.senha };
        this.infoResquest = {
            rqst: "post",
            otherUrl: "http://10.40.196.172:9001/efika/logar",
            command: "entrar",
            _data: _d,
            gettoken: true,
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as boolean;
            })
            .catch(super.handleError);
    }

    public getuserifos(usuario: Usuario) {
        let _d: { matricula: string, password: string };
        _d = { matricula: usuario.matricula, password: usuario.senha };
        this.infoResquest = {
            rqst: "post",
            command: "getuserinfo",
            timeout: 10000,
            otherUrl: "http://10.40.196.172:9001/efika/verify",
            _data: _d,
            gettoken: true
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleError);
    }

}