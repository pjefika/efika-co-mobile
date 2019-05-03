import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { AtendimentoDigital } from '../../view-model/atendimento-digital/atendimento-digital';
import { TaskProcess } from '../../view-model/task-process/task-process';

@Injectable()
export class AtendimentoDigitalService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public setAtendimento(atendimentoDigital: AtendimentoDigital): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: AtendimentoDigital, executor: string };
        _data = { task: "ATDG_POST", input: atendimentoDigital, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "post",
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

    public getAtendimentos(): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: any, executor: string };
        _data = { task: "ATDG_LIST", input: null, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "post",
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

    public getAtendimento(idAtdg: number): Promise<TaskProcess> {
        // ATDG_ATENDIMENTO
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { id: number }, executor: string };
        _data = { task: "ATDG_ATENDIMENTO", input: { id: idAtdg }, executor: userSession.user };
        this.infoResquest = {
            rqst: "post",
            command: "post",
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

    public updateAtendimento() {
        // ATDG_UPDATE

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

}