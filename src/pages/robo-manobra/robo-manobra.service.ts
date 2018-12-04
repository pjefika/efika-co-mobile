import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { TaskProcess } from '../../view-model/task-process/task-process';

declare var require: any

@Injectable()
export class RoboManobraService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public setTaskRoboManobra(tipoTecnologia: string, numeroInstancia: string, primaria: string, equipamento: string): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, tipo_tecnologia: string, numero_instancia: string, primaria: string, equipamento: string }, executor: string };
        _data = { task: "DISPONIBILIDADE", input: { type: "disponibiidade", tipo_tecnologia: tipoTecnologia, numero_instancia: numeroInstancia, primaria: primaria, equipamento: equipamento }, executor: userSession.user };
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

    public setTaskRoboManuevers(idSolicitacao: string,
        numeroTerminal: string,
        motivoManobra: string,
        tipoTecnologia: string,
        primaria: string,
        secundaria: string,
        statusPorta: string,
        codcto: string): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, id_solicitacao: string, numero_terminal: string, motivo_manobra: string, tipo_tecnologia: string, primaria: string, secundaria: string, status_porta: string, cto: string }, executor: string };
        _data = { task: "MANUEVERS", input: { type: "manuevers", id_solicitacao: idSolicitacao, numero_terminal: numeroTerminal, motivo_manobra: motivoManobra, tipo_tecnologia: tipoTecnologia, primaria: primaria, secundaria: secundaria, status_porta: statusPorta, cto: codcto }, executor: userSession.user };
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

    public setTaskManobraProvisioning(idSolicitacao: string, numeroTerminal: string): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { type: string, id_solicitacao: string, numero_terminal: string }, executor: string };
        _data = { task: "PROVISIONING", input: { type: "provisioning", id_solicitacao: idSolicitacao, numero_terminal: numeroTerminal }, executor: userSession.user };
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

    public getmanobradispMock(): TaskProcess {
        let info: TaskProcess = require("../../assets/mocks/manobra/mock-manobrar.json");
        return info
    }

    public getmanobradoMock(): TaskProcess {
        let info: TaskProcess = require("../../assets/mocks/manobra/mock-manobrado.json");
        return info
    }

    public getsituacaomanobraMock(): TaskProcess {
        let info: TaskProcess = require("../../assets/mocks/manobra/mock-manobra-disp.json");
        return info
    }

}