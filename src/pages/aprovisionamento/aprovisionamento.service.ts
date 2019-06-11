import { Injectable } from '@angular/core';
import { SuperService } from '../../providers/super-service/super.service';
import { Cadastro } from '../../view-model/cadastro/cadastro';
import { TaskProcess } from '../../view-model/task-process/task-process';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { ProbSolucao } from '../../view-model/fulltest/prob_solucao';
import { Device } from '../../view-model/aprovisionamento/device';

declare var require: any

@Injectable()
export class AprovisionamentoService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public listSlots(ss: string, cadastro: Cadastro): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { ss: string, ec: Cadastro }, executor: string };
        _data = { task: "APRV_LIST_SLOTS", input: { ss: ss, ec: cadastro }, executor: userSession.user };
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

    public aprovisionar(ss: string, cadastro: Cadastro, stb: Device, hg: Device): Promise<TaskProcess> {
        let userSession = JSON.parse(localStorage.getItem("user"));
        let _data: { task: string, input: { ss: string, ec: Cadastro, stb: Device, hg: Device }, executor: string };
        _data = { task: "APRV_APROVISIONAR", input: { ss: ss, ec: cadastro, stb: stb, hg: hg }, executor: userSession.user };

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

    public doFulltestMock(): TaskProcess {
        let cert: TaskProcess = require('../../assets/mocks/fulltest/fulltest-metalico.json'); // Metalico
        // let cert: TaskProcess = require('../../assets/mocks/fulltest/fulltest-gpon.json'); // GPON

        // console.log(f);
        //GPON
        // cert = JSON.parse('{"resultado":"OK","orientacao":"OK","id":"5a9d5823cb66bf19d54c4133","blocks":[{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Não há bloqueio no Radius.","nome":"HAS_BLOQ_RADIUS"},{"resultado":"OK","orientacao":"Radius e Inventário de Rede OK.","nome":"IS_INV_REDE_EQUALS_RADIUS"},{"resultado":"OK","orientacao":"Inventário de Rede OK.","nome":"HAS_INV_REDE"},{"resultado":"OK","orientacao":"Inventário de Serviços OK.","nome":"HAS_INV_SERV"}],"nome":{"name":"CADASTRO","beautyName":"Cadastro"}},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Vlan de Banda configurado corretamente. Vlan de VoIP configurado corretamente.","nome":"IS_VLANS_OK"},{"resultado":"OK","orientacao":"Profile configurado corretamente.","nome":"IS_PROFILE_OK"}],"nome":{"name":"SERVICOS","beautyName":"Serviços"}},{"resultado":"OK","orientacao":"OK","asserts":[],"nome":{"name":"PERFORMANCE","beautyName":"Performance"}},{"resultado":"OK","orientacao":"OK","asserts":[{"resultado":"OK","orientacao":"Porta Ativada (Adm state Up).","nome":"IS_ADM_UP"},{"resultado":"OK","orientacao":"Sincronismo/Link OK.","nome":"IS_OPER_UP"},{"resultado":"OK","orientacao":"Parâmetros dentro do padrão (entre -8 e -28).","nome":"IS_PARAM_OK"},{"resultado":"OK","orientacao":"Não foi identificada falha massiva.","nome":"IS_VIZINHO_OK"},{"resultado":"OK","orientacao":"Mac identificado 10:72:23:14:32:80.","nome":"HAS_MAC_DSLAM"}],"nome":{"name":"CONECTIVIDADE","beautyName":"Conectividade"}}],"dataInicio":1520261099337,"dataFim":1520261155655,"customer":{"designador":"CIM-81IDZUA6D-013","instancia":"2830271731","designadorAcesso":"CIM-06120648-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.227.26.15","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":15,"sequencial":964,"logica":4,"rin":15,"vlanVoip":1015,"vlanVod":3015,"vlanMulticast":4000,"cvlan":1064,"":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"2830271731","central":"MGBHE_HMS04"},"radius":{"status":"ATIVO","armario":"ESCIM_G1A05","rin":"015","velocidade":"51200 - 5120","ipFixo":"NAO ENCONTROU","profile":"a5120b51200 op:CIM-81IDZUA6D-013","porta":"964","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1520261088887},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1520261088887},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1520261088887}],"eventos":[]},"executor":"G0034481","fulltest":{"resultado":true,"dataInicio":1520261046547,"dataFim":1520261102791,"mensagem":"Não foram identificados problemas de configuração. Se o problema/sintoma informado pelo cliente persiste, seguir o fluxo.","id":null,"cl":{"designador":"CIM-81IDZUA6D-013","instancia":"2830271731","designadorAcesso":"CIM-06120648-069","designadorTv":null,"rede":{"tipo":"GPON","origem":"ONLINE","planta":"VIVO2","ipDslam":"10.227.26.15","vendorDslam":"ALCATEL","modeloDslam":"GPON_CARD","idOnt":null,"terminal":null,"ipMulticast":null,"nrc":null,"slot":6,"porta":15,"sequencial":964,"logica":4,"rin":15,"vlanVoip":1015,"vlanVod":3015,"vlanMulticast":4000,"cvlan":1064,"bhs":null},"redeExterna":{"tipo":null,"origem":null,"planta":null,"splitter1n":null,"splitter2n":null,"caboAlim":null,"fibra1n":null,"fibra2n":null},"servicos":{"velDown":51200,"velUp":5120,"tipoTv":null,"tipoLinha":"SIP"},"linha":{"tipo":"IMS","dn":"2830271731","central":"MGBHE_HMS04"},"radius":{"status":"ATIVO","armario":"ESCIM_G1A05","rin":"015","velocidade":"51200 - 5120","ipFixo":"NAO ENCONTROU","profile":"a5120b51200 op:CIM-81IDZUA6D-013","porta":"964","isIpFixo":false},"asserts":[{"asserts":"DIVERGENCIA_TBS_RADIUS","value":false,"creationDate":1520261088887},{"asserts":"CIRCUITO_ATIVO","value":true,"creationDate":1520261088887},{"asserts":"HAS_BLOQUEIO_RADIUS","value":false,"creationDate":1520261088887}],"eventos":[]},"valids":[{"nome":"Estado Administrativo da Porta","mensagem":"Porta Ativada (Adm state Up).","resultado":true,"foiCorrigido":false,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Estado Operacional da Porta","mensagem":"Sincronismo OK.","resultado":true,"foiCorrigido":null,"result":{"nome":"Estado da Porta","type":"telecom.properties.EstadoDaPorta","adminState":true,"operState":true}},{"nome":"Afetação Vizinhança","mensagem":"Não foi identificada falha massiva.","resultado":true,"foiCorrigido":null,"result":null},{"nome":"Associação Serial ONT","mensagem":"Identificado ONT associada: TLCM00015C9B.","resultado":true,"foiCorrigido":null,"result":{"nome":"Associação Serial ONT","type":"telecom.properties.gpon.SerialOntGpon","serial":"TLCM00015C9B","slot":null,"porta":null,"idOnt":null}},{"nome":"Parâmetros Ópticos","mensagem":"Parâmetros dentro do padrão (entre -8 e -28).","resultado":true,"foiCorrigido":null,"result":{"nome":"Parâmetros Ópticos","type":"telecom.properties.gpon.TabelaParametrosGpon","potOnt":-15.514,"potOlt":-18.2}},{"nome":"Profile","mensagem":"Profile configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Profile","type":"telecom.properties.Profile","profileUp":"HSI_5M_RETAIL_UP","profileDown":"HSI_50M_RETAIL_DOWN","down":"VEL_51200","up":"VEL_5120"}},{"nome":"Vlan Banda Larga","mensagem":"Vlan de Banda configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan Banda Larga","type":"telecom.properties.VlanBanda","cvlan":1064,"svlan":15,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoIP","mensagem":"Vlan de VoIP configurado corretamente.","resultado":true,"foiCorrigido":false,"result":{"nome":"Vlan VoIP","type":"telecom.properties.VlanVoip","cvlan":1064,"svlan":1015,"pctDown":null,"pctUp":null,"state":"UP"}},{"nome":"Vlan VoD/IPTV","mensagem":"Cliente sem TV.","resultado":true,"foiCorrigido":false,"result":null},{"nome":"MAC do Equipamento","mensagem":"Mac identificado 10:72:23:14:32:80.","resultado":true,"foiCorrigido":null,"result":{"nome":"MAC do Equipamento","type":"telecom.properties.DeviceMAC","mac":"10:72:23:14:32:80"}}]}}');
        return cert;
    }

    public getMotivosFulltest(): Promise<ProbSolucao[]> {
        this.infoResquest = {
            rqst: "get",
            command: "getsolucoes",
            timeout: 10000,
            // otherUrl: "http://10.40.196.172:9092/solucoes"
            otherUrl: "http://54.94.208.183:8080/solucoes"
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as ProbSolucao[];
            });
    }


}