import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/url-service/url.service';
import { TaskProcess } from '../../../view-model/task-process/task-process';

@Injectable()
export class ConfiabilidadeRedeService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getConfRede(instancia: string): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string }, executor: string };
        _data = { task: "CONF_REDE", input: { type: "certification", instancia: instancia }, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.queueAPI + "task/process/",
            _data: _data,
            timeout: 120000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }
}