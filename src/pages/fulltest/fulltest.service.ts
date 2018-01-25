import { Injectable } from '@angular/core';
import { UrlService } from '../../providers/url-service/url.service';
import { SuperService } from '../../providers/super-service/super.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';
import { TaskProcess } from '../../view-model/task-process/task-process';

@Injectable()
export class FulltestService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public doFulltest(cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, customer: Cadastro }, executor: string };
        _data = { task: "CERTIFICATION", input: { type: "certification", customer: cadastro }, executor: userSession.user };
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