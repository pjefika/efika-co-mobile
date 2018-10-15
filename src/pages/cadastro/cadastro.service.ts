import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { TaskProcess } from '../../view-model/task-process/task-process';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';

declare var require: any

@Injectable()
export class CadastroService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public getCadastro(instancia: string): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string }, executor: string };
        _data = { task: "CADASTRO", input: { type: "cadastro", instancia: instancia }, executor: userSession.user };
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

    public gettask(id: String): Promise<any> {
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

    public getCadastroMock(): TaskProcess {
        // let task: TaskProcess = require("../../assets/mocks/cadastro/cadastro_metalico.json"); // Metalico
        let task: TaskProcess = require("../../assets/mocks/cadastro/cadastro_gpon.json"); // GPON
        return task;
    }
}