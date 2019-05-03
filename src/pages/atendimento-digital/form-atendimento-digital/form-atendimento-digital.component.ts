import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
import { AtendimentoDigital } from '../../../view-model/atendimento-digital/atendimento-digital';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { AtendimentoDigitalTabelaValidacao } from '../../../view-model/atendimento-digital/atendimento-digital-tabela-validacao';

@Component({
    selector: 'form-atendimento-digital-component',
    templateUrl: 'form-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class FormAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    public atendimentoDigital: AtendimentoDigital;

    public isValidAttrs: boolean = false;

    public atendimentoDigitalTabelaValidacao: AtendimentoDigitalTabelaValidacao;

    constructor(private atendimentoDigitalService: AtendimentoDigitalService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.atendimentoDigital = new AtendimentoDigital();
    }

    // public setAtendimento() {
    //     this.atendimentoDigital.nomeTecnico = this.holderService.user.name;
    //     this.atendimentoDigital.matriculaTecnico = this.holderService.user.matricula;
    //     this.atendimentoDigital.telefoneTecnico = this.holderService.user.phone;
    //     this.atendimentoDigital.emailTecnico = this.holderService.user.email;

    //     this.atendimentoDigital.fkId = this.holderService.certification.fkId;
    //     this.atendimentoDigital.instancia = this.holderService.certification.customer.instancia;

    //     console.log(this.atendimentoDigital);
    //     // super.showAlert("Sucesso", "Atendimento Enviado com sucesso, por favor aguarde.");

    //     // this.atendimentoDigital = new AtendimentoDigital();
    // }

    public setAtendimento() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Enviando atendimento");
        this.atendimentoDigital.nomeTecnico = this.holderService.user.name;
        this.atendimentoDigital.matriculaTecnico = this.holderService.user.matricula;
        this.atendimentoDigital.telefoneTecnico = this.holderService.user.phone;
        this.atendimentoDigital.emailTecnico = this.holderService.user.email;

        this.atendimentoDigital.fkId = this.holderService.certification.fkId;
        this.atendimentoDigital.instancia = this.holderService.certification.customer.instancia;

        this.atendimentoDigitalService
            .setAtendimento(this.atendimentoDigital)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.atendimentoDigitalService
                                .gettask(resposta.id)
                                .then(response_1 => {
                                    if (response_1.state === "EXECUTED") {
                                        super.showAlert("Sucesso", "Atendimento Enviado com sucesso, por favor aguarde.");
                                        this.navCtrl.pop();
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        this.loading(false);
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        clearInterval(rqSi);
                                    }
                                });
                        } else {
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }


    public changeMotivos() {
        this.atendimentoDigitalTabelaValidacao = new AtendimentoDigitalTabelaValidacao();
        switch (this.atendimentoDigital.motivo) {
            case "ATSIP":
                this.validacaoATSIP();
                break;
            case "APTV":
                this.validacaoAPTV();
                break;
            case "ATSIPE":
                this.validacaoATSIPE();
                break;
            case "APTVE":
                this.validacaoAPTVE();
                break;
        }
    }

    public validacaoATSIPE() {
        this.atendimentoDigitalTabelaValidacao = {
            rede: "N/A",
            tecnologia: "N/A",
            bandaLargaOk: false,
            isIPTv: "N/A",
            isTvHibrida: "N/A",
            isTvDTH: "N/A",
            IsSIP: false,
            isLinhaMetalico: false
        }
        if (this.atendimentoDigitalTabelaValidacao.bandaLargaOk
            && this.atendimentoDigitalTabelaValidacao.IsSIP
            && !this.atendimentoDigitalTabelaValidacao.isLinhaMetalico) {
            this.isValidAttrs = true;
        } else {
            this.isValidAttrs = false;
        }
    }

    public validacaoAPTVE() {
        this.atendimentoDigitalTabelaValidacao = {
            rede: "N/A",
            tecnologia: false,
            bandaLargaOk: false,
            isIPTv: false,
            isTvHibrida: false,
            isTvDTH: false,
            IsSIP: "N/A",
            isLinhaMetalico: "N/A"
        }
        if (this.atendimentoDigitalTabelaValidacao.tecnologia
            && this.atendimentoDigitalTabelaValidacao.bandaLargaOk
            && this.atendimentoDigitalTabelaValidacao.isIPTv
            && this.atendimentoDigitalTabelaValidacao.isTvHibrida
            && !this.atendimentoDigitalTabelaValidacao.isTvDTH) {
            this.isValidAttrs = true;
        } else {
            this.isValidAttrs = false;
        }
    }


    public validacaoATSIP() {
        // this.atendimentoDigitalTabelaValidacao = {
        //     rede: "N/A",
        //     tecnologia: "N/A",
        //     bandaLargaOk: this.holderService.certification.fulltest.resultado,
        //     isIPTv: "N/A",
        //     isTvHibrida: "N/A",
        //     isTvDTH: "N/A",
        //     IsSIP: this.holderService.cadastro.servicos.tipoLinha === "SIP",
        //     isLinhaMetalico: this.holderService.cadastro.servicos.tipoLinha === "TDM"
        // }
        // if (this.atendimentoDigitalTabelaValidacao.bandaLargaOk
        //     && this.atendimentoDigitalTabelaValidacao.IsSIP
        //     && !this.atendimentoDigitalTabelaValidacao.isLinhaMetalico) {
        //     this.isValidAttrs = true;
        // }
        this.isValidAttrs = true;
    }

    public validacaoAPTV() {
        // this.atendimentoDigitalTabelaValidacao = {
        //     rede: "N/A",
        //     tecnologia: this.holderService.cadastro.rede.tipo === "GPON",
        //     bandaLargaOk: this.holderService.certification.fulltest.resultado,
        //     isIPTv: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv != "IPTV",
        //     isTvHibrida: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv != "Hibrido",
        //     isTvDTH: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv === "DTH",
        //     IsSIP: "N/A",
        //     isLinhaMetalico: "N/A"
        // }
        // if (this.atendimentoDigitalTabelaValidacao.tecnologia
        //     && this.atendimentoDigitalTabelaValidacao.bandaLargaOk
        //     && this.atendimentoDigitalTabelaValidacao.isIPTv
        //     && this.atendimentoDigitalTabelaValidacao.isTvHibrida
        //     && !this.atendimentoDigitalTabelaValidacao.isTvDTH) {
        //     this.isValidAttrs = true;
        // }
        this.isValidAttrs = true;
    }

}