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

    public getCadastroMock(): TaskProcess {
        // let task: TaskProcess = require("../../assets/mocks/cadastro/cadastro_metalico.json"); // Metalico
        let task: TaskProcess = require("../../assets/mocks/cadastro/cadastro_gpon.json"); // GPON

        //Metalico
        // cad = JSON.parse('{"designador":"CTA-81E2J3HSS-013","instancia":"4131543457","designadorAcesso":"CTA-04887444-069","designadorTv":"TV-CTA-81E2J3HST-050","rede":{"tipo":"METALICA","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.200.30.177","vendorDslam":"KEYMILE","modeloDslam":"SUVD11","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":3,"porta":37,"sequencial":1085,"logica":1085,"rin":74,"vlanVoip":1074,"vlanVod":3074,"vlanMulticast":4000,"cvlan":1185,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":"DTH","tipoLinha":"TDM"},"linha":{"tipo":"TDM","dn":"4131543457","central":"PRCTA_PVS01"},"radius":{"status":"ATIVO","armario":"PRCTA_O1C50","rin":"074","velocidade":"51200 - 5120","ipFixo":"-","profile":"r5120b51200","porta":"1085","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1520259652992},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1520259652992},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1520259652992}],"eventos":[]}');
        //GPON
        // cad = JSON.parse('{"designador":"CIM-81IDZUA6D-013","instancia":"2830271731","designadorAcesso":"CIM-06120648-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.227.26.15","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":15,"sequencial":964,"logica":4,"rin":15,"vlanVoip":1015,"vlanVod":3015,"vlanMulticast":4000,"cvlan":1064,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"2830271731","central":"MGBHE_HMS04"},"radius":{"status":"ATIVO","armario":"ESCIM_G1A05","rin":"015","velocidade":"51200 - 5120","ipFixo":"NAO ENCONTROU","profile":"a5120b51200 op:CIM-81IDZUA6D-013","porta":"964","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1520261088887},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1520261088887},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1520261088887}],"eventos":[]}');
        return task;
    }
}