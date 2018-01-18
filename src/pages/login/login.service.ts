import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';
import { UrlService } from '../../providers/url-service/url.service';
import { SuperService } from '../../providers/super-service/super.service';
import { TaskProcess } from '../../view-model/task-process/task-process';

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
            command: this.urlService.queueAPI + "task/process/",
            _data: _data,
            timeout: 20000
        };

        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }

    public entrarMock(usuario: Usuario): boolean {

        if (usuario.matricula === "G0034481" && usuario.senha === "123") {
            return true;
        } else {
            return false;
        }

    }

}