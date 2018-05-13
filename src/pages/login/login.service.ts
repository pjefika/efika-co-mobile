import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';
import { SuperService } from '../../providers/super-service/super.service';
import { TaskProcess } from '../../view-model/task-process/task-process';
import { UrlService } from '../../providers/new_url-service/url.service';

@Injectable()
export class LoginService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public entrar(usuario: Usuario): Promise<TaskProcess> {
        let _data: { task: string, input: { type: string, login: string, senha: string }, executor: string };
        _data = { task: "AUTH", input: { type: "auth", login: usuario.matricula, senha: usuario.senha }, executor: "IONIC - Mobile" };
        this.infoResquest = {
            rqst: "post",
            command: "task/process/",
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

    public entrarMock(usuario: Usuario): boolean {
        if (usuario.matricula === "1" && usuario.senha === "1") {
            return true;
        } else {
            return false;
        }
    }

}