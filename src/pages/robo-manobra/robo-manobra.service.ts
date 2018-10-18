import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { TaskProcess } from '../../view-model/task-process/task-process';

@Injectable()
export class RoboManobraService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public setTaskRoboManobra(tipoTecnologia: string, numeroInstancia: string, motivoManobra: string): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, tipoTecnologia: string, motivoManobra: string, numeroInstancia: string }, executor: string };
        _data = { task: "DISPONIBILIDADE", input: { type: "disponibiidade", tipoTecnologia: tipoTecnologia, motivoManobra: motivoManobra, numeroInstancia: numeroInstancia }, executor: userSession.user };
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
}