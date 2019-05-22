import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
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


    public isValidAttrs: boolean = false;

    public motivo: string;

    public atendimentoDigitalTabelaValidacao: AtendimentoDigitalTabelaValidacao;


    constructor(
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {

    }

    public changeMotivos() {
        switch (this.motivo) {
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
        this.atendimentoDigitalTabelaValidacao = {
            rede: "N/A",
            tecnologia: "N/A",
            bandaLargaOk: this.holderService.certification.fulltest.resultado,
            isIPTv: "N/A",
            isTvHibrida: "N/A",
            isTvDTH: "N/A",
            IsSIP: this.holderService.cadastro.servicos.tipoLinha === "SIP",
            isLinhaMetalico: this.holderService.cadastro.servicos.tipoLinha === "TDM"
        }
        if (this.atendimentoDigitalTabelaValidacao.bandaLargaOk
            && this.atendimentoDigitalTabelaValidacao.IsSIP
            && !this.atendimentoDigitalTabelaValidacao.isLinhaMetalico) {
            this.isValidAttrs = true;
        }
        // this.isValidAttrs = true;
    }

    public validacaoAPTV() {
        this.atendimentoDigitalTabelaValidacao = {
            rede: "N/A",
            tecnologia: this.holderService.cadastro.rede.tipo === "GPON",
            bandaLargaOk: this.holderService.certification.fulltest.resultado,
            isIPTv: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv != "IPTV",
            isTvHibrida: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv != "Hibrido",
            isTvDTH: this.holderService.cadastro.servicos.tipoTv != null || this.holderService.cadastro.servicos.tipoTv === "DTH",
            IsSIP: "N/A",
            isLinhaMetalico: "N/A"
        }
        if (this.atendimentoDigitalTabelaValidacao.tecnologia
            && this.atendimentoDigitalTabelaValidacao.bandaLargaOk
            && this.atendimentoDigitalTabelaValidacao.isIPTv
            && this.atendimentoDigitalTabelaValidacao.isTvHibrida
            && !this.atendimentoDigitalTabelaValidacao.isTvDTH) {
            this.isValidAttrs = true;
        }
        // this.isValidAttrs = true;
    }

}