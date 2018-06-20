import { Injectable } from '@angular/core';
import { SuperService } from '../../../../providers/super-service/super.service';
import { TaskProcess } from '../../../../view-model/task-process/task-process';
import { Cadastro } from '../../../../view-model/cadastro/cadastro';
import { UrlService } from '../../../../providers/new_url-service/url.service';
import { HolderService } from '../../../../providers/holder/holder.service';

@Injectable()
export class OntsLivresService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public getOntsDisp(instancia: string, cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string, customer: Cadastro }, executor: string };
        _data = { task: "ONTS_DISP", input: { type: "certification", instancia: instancia, customer: cadastro }, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "task/queue",
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
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, serial: string, customer: Cadastro }, executor: string };
        _data = { task: "SET_ONT", input: { type: "setOntToOlt", serial: serial, customer: cadastro }, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "task/queue",
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

}