import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Output } from '../../view-model/task-process/output-task';
import { ExceptionService } from '../exception/exception.service';
import { Rede } from '../../view-model/cadastro/rede';
import { HolderService } from '../holder/holder.service';

@Injectable()
export class SuperComponentService extends ExceptionService {

    public carregando;

    public timercount: any;

    public timer: number;

    public ativo: boolean = false;
    public titulo: string;
    public mensagem: string;
    public tipo: string;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService) {
        super();
    }
    /**
     * 
     * @param ativo 
     * @param tipo 
     * @param titulo 
     * @param mensagem 
     */
    public showError(ativo: boolean, tipo?: string, titulo?: string, mensagem?: string) {
        this.ativo = ativo;
        this.tipo = tipo;
        this.titulo = titulo;
        this.mensagem = mensagem;
    }

    /**
     * Mostra alerta na tela do usuário
     * @param titulo Titulo do alerta
     * @param subTitle Mensgem que será mostrada
     * @param hidebutton Esconde e mostra botão para fechar / se mensagem ira bloquear tela
     */
    public showAlert(titulo: string, subTitle: string, hidebutton?: boolean) {
        let alert;
        if (hidebutton === true) {
            alert = this.alertCtrl.create({
                title: titulo,
                subTitle: subTitle,
                enableBackdropDismiss: false
            });
        } else {
            alert = this.alertCtrl.create({
                title: titulo,
                subTitle: subTitle,
                buttons: ["Ok"]
            });
        }
        alert.present();
    }

    /**
     * Tratativa do state do request de cadastro do cliente
     * Se EXCEPTION faz chamada automatica do showError mostrando informação.
     * @param output Objeto contendo informações de cadastro do cliente.     
     */
    public validState(output: Output, instancia: string): boolean {
        let v: boolean;
        switch (output.state) {
            case "OK":
                v = true;
                break;
            case "EXCEPTION":
                v = false;
                this.showAlert(super.makeexceptionmessageTitle("Ops, aconteceu algo.", true), super.makeexceptionmessage(output.exceptionMessage, instancia));
                console.log("Deu erro -- EXCEPTION IN: " + output.type + " -- !!! AMD p(o.o)q");
                break;
        }
        return v;
    }

    /**
     * Faz validação do cadastro do cliente validando se o mesmo possui Designador & IP DSLAM
     * @param output Objeto contendo informações de cadastro do cliente.
     * @param instancia Número do cliente
     */
    public validCustomer(output: Output, instancia: string): boolean {
        let v: boolean = false;
        if (output.customer.designador) {
            v = true;
        }
        if (!output.customer.rede.ipDslam) {
            this.showAlert(super.makeexceptionmessageTitle("Ops, aconteceu algo. Cod.40", false), super.makeexceptionmessage("Não foram identificados informações de rede do cliente, não sendo possivel realizar testes, gerado FKID.", instancia));
        }
        if (output.customer.designador && !output.customer.rede.ipDslam) {
            this.holderService.errorneedfkid = true;
            this.holderService.btnFazFulltestAtivo = false;
        }
        return v;
    }

    /**
     * Habilita timer para ser mostrado na tela fazendo o contador pular de 1 em 1 segundo.
     * @param maxtime Tempo maximo
     */
    public doTimer(maxtime: number) {
        this.timer = maxtime; // Passa valor maximo para o timer
        this.timercount = setInterval(() => {
            this.timer--; // Diminui contador
            if (this.timer < 1) { // Se timer zerar finaliza o mesmo.
                clearInterval(this.timercount);
            }
            // console.log(this.timer);
        }, 1000); // intervalo de 1 segundo.
    }

    /**
     * Timer referente ao request aonde o mesmo desabilita e seta como null o contador.
     */
    public killtimer() { // Para o contador.
        clearInterval(this.timercount);
        this.timer = null;
    }

    /**
     * Inicia ou Inativa o loading na tela, o mesmo tambem desliga o timer caso o mesmo for false.
     * @param active Booleano que Ativa/Inativa loading 
     * @param msg Mensagem que será mostrada se active for true 
     */
    public loading(active: boolean, msg?: string) {
        if (active) {
            this.carregando = this.loadingCtrl.create({ content: msg });
            this.carregando.present();
        } else {
            this.carregando.dismiss();
            this.killtimer();
        }
    }

    /**
     * Valida se o DSLAM buscado é implementado de acordo com a lista de DSLAMs não implementados.
     * @param rede Objeto rede
     * @param instancia Número do cliente 
     */
    public validDSLAM(rede: Rede, instancia: string) {
        if (rede.modeloDslam === "LIADSLPT48"
            || rede.modeloDslam === "VDSL24"
            || rede.modeloDslam === "VDPE_SIP"
            || rede.modeloDslam === "CCPE_SIP"
            || rede.modeloDslam === "CCPE"
            || rede.modeloDslam === "LI-VDSL24"
            || rede.modeloDslam === "NVLT"
            || rede.modeloDslam === "NVLT-C_SIP") {
            this.showAlert(super.makeexceptionmessageTitle("Atenção.", true), super.makeexceptionmessage("Modelo de DSLAM não implementado, não sendo possivel realizar o Fulltest, necessário contato com o Centro de Operações, gerado FKID.", instancia));
            this.holderService.errorneedfkid = true;
            this.holderService.btnFazFulltestAtivo = false;
        }
    }

}