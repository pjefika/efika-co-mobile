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

    public showError(ativo: boolean, tipo?: string, titulo?: string, mensagem?: string) {
        this.ativo = ativo;
        this.tipo = tipo;
        this.titulo = titulo;
        this.mensagem = mensagem;
    }

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
     * 
     * @param output 
     * Tratativa do state do Output
     * Se EXCEPTION faz chamada automatica do showError mostrando informação.
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

    public killtimer() { // Para o contador.
        clearInterval(this.timercount);
        this.timer = null;
    }

    public loading(active: boolean, msg?: string) {
        if (active) {
            this.carregando = this.loadingCtrl.create({ content: msg });
            this.carregando.present();
        } else {
            this.carregando.dismiss();
            this.killtimer();
        }
    }

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