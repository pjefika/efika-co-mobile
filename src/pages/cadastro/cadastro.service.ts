import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/url-service/url.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';
import { TaskProcess } from '../../view-model/task-process/task-process';

@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public _getCadastro(instancia: string) {
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: "ionicTest" };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            timeout: 63000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }


    public getCadastro(instancia: string): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string }, executor: string };
        _data = { task: "CADASTRO", input: { type: "cadastro", instancia: instancia }, executor: userSession };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.queueAPI + "task/process/",
            _data: _data,
            timeout: 63000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }


}