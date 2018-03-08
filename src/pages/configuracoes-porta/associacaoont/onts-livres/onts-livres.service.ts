import { Injectable } from '@angular/core';
import { SuperService } from '../../../../providers/super-service/super.service';
import { UrlService } from '../../../../providers/url-service/url.service';
import { TaskProcess } from '../../../../view-model/task-process/task-process';
import { Cadastro } from '../../../../view-model/cadastro/cadastro';

@Injectable()
export class OntsLivresService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getOntsDisp(instancia: string, cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string, customer: Cadastro }, executor: string };
        _data = { task: "ONTS_DISP", input: { type: "certification", instancia: instancia, customer: cadastro }, executor: userSession.user };
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

    public setOntsDisp(serial: string, cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, serial: string, customer: Cadastro }, executor: string };
        _data = { task: "SET_ONT", input: { type: "setOntToOlt", serial: serial, customer: cadastro }, executor: userSession.user };
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