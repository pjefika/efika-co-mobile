import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { UrlService } from '../../providers/url-service/url.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';
import { TaskProcess } from '../../view-model/task-process/task-process';

@Injectable()
export class CadastroService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public _getCadastro(instancia: string) {
        let _data: { instancia: string, executor: string };
        _data = { instancia: instancia, executor: "ionicTest" };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathStealerAPI + "oss/",
            _data: _data,
            timeout: 120000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Cadastro
            })
            .catch(super.handleError);
    }

    public getCadastro(instancia: string): Promise<TaskProcess> {
        let userSession = JSON.parse(sessionStorage.getItem("user"));
        let _data: { task: string, input: { type: string, instancia: string }, executor: string };
        _data = { task: "CADASTRO", input: { type: "cadastro", instancia: instancia }, executor: userSession.user };
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

    public getCadastroMock(): Cadastro {
        //Metalico
        //let cad: Cadastro = JSON.parse('{"designador":"PAE-812GNAJKCY-013","instancia":"5130190034","designadorAcesso":"PAE-11089448-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.151.206.114","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":7,"porta":14,"sequencial":1466,"logica":26,"rin":227,"vlanVoip":1227,"vlanVod":3227,"vlanMulticast":4000,"cvlan":1566,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"5130190034","central":"PRCTA_VMS02"},"radius":{"status":"ATIVO","armario":"RSPAE_O1B75","rin":"227","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"a25600b51200 op:PAE-812GNAJKCY-013","porta":"1466","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1516303391080},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1516303391080},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1516303391080}],"eventos":[{"tipoAlarme":"ABC","tipoFalha":"ABC","tipoAfetacao":"ABC","desc":"ABC","dataAbertura":1516442400000,"dataPrevista":1516792747000,"numeroEvento":123456,"tipoEvento":"ABC"},{"tipoAlarme":"ABC","tipoFalha":"ABC","tipoAfetacao":"ABC","desc":"ABC","dataAbertura":1516442400000,"dataPrevista":1516792747000,"numeroEvento":123456,"tipoEvento":"ABC"}]}');
        //GPON
        let cad: Cadastro = JSON.parse('{"designador":"RCE-30NCGZJQ-013","instancia":"8134650186","designadorAcesso":"RCE-15395420-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.181.9.21","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":4,"sequencial":1225,"logica":9,"rin":211,"vlanVoip":1211,"vlanVod":3211,"vlanMulticast":4000,"cvlan":1325,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":25600,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"8134650186","central":"PERCE_LNS03"},"radius":{"status":"ATIVO","armario":"PERCE_G1I07","rin":"211","velocidade":"51200 - 25600","ipFixo":"NAO ENCONTROU","profile":"r25600b51200 op:RCE-30NCGZJQ-013","porta":"1225","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1517329517494},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1517329517494},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1517329517494}],"eventos":[]}');
        return cad;
    }
}