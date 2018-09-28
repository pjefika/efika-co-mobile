import { Injectable } from '@angular/core';

import { SuperService } from '../../providers/super-service/super.service';

import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';

import { Cadastro } from '../../view-model/cadastro/cadastro';
import { TaskProcess } from '../../view-model/task-process/task-process';

declare var require: any

@Injectable()
export class FulltestTVService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public setTaskManobra(cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, customer: Cadastro }, executor: string };
        _data = { task: "HPNA", input: { type: "hpna", customer: cadastro }, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "post",
            _data: _data,
            timeout: 180000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }

    public gettask(id: String): Promise<TaskProcess> {
        this.infoResquest = {
            rqst: "get",
            command: "",
            _data: id,
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as TaskProcess;
            });
    }


    public getFulltestTVMock() {
        let task: TaskProcess = require("../../assets/mocks/fulltest-tv/fulltest-tv.json");
        return task;
    }

}