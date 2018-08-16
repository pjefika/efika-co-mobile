import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';
import { SuperService } from '../../providers/super-service/super.service';
import { TaskProcess } from '../../view-model/task-process/task-process';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public entrar(usuario: Usuario): Promise<TaskProcess> {
        let _data: { task: string, input: { type: string, login: string, senha: string }, executor: string };
        _data = { task: "AUTH", input: { type: "auth", login: usuario.matricula, senha: usuario.senha }, executor: "IONIC - Mobile" };
        this.infoResquest = {
            rqst: "post",
            command: "task/queue",
            _data: _data,
            timeout: 60000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }

    public gettask(id: String): Promise<any> {
        this.infoResquest = {
            rqst: "get",
            command: "task/",
            _data: id,
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as TaskProcess;
            });
    }

    public entrarnewauthMock(usuario: Usuario): boolean {
        if (usuario.matricula === "1" && usuario.senha === "1") {
            return true;
        } else {
            return false;
        }
    }

    public getuserifosMock() {



    }

    public entrarnewauth(usuario: Usuario): Promise<boolean> {
        let _d: { username: string, password: string };
        _d = { username: usuario.matricula, password: usuario.senha };
        this.infoResquest = {
            rqst: "post",
            otherUrl: "http://10.40.196.171:8080/auth/logar",
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

    public getuserifos(matricula: string) {
        this.infoResquest = {
            rqst: "get",
            command: "getuserinfo",
            timeout: 10000,
            havetoken: true,
            otherUrl: "http://10.40.196.171:8080/auth/usuario/getinfo?matricula=",
            _data: matricula
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta;
            })
            .catch(this.handleErrorKing);
    }

}