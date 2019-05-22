import { Component, OnInit, Input } from '@angular/core';
import { AtendimentoDigital, AddPontos } from '../../../../view-model/atendimento-digital/atendimento-digital';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { AtendimentoDigitalService } from '../../atendimento-digital.service';

@Component({
    selector: 'aptv-component',
    templateUrl: 'aptv.component.html',
    providers: [AtendimentoDigitalService]
})

export class AptvComponent extends SuperComponentService implements OnInit {

    @Input()
    public motivo: string;

    public atendimentoDigital: AtendimentoDigital;

    public pontoMac: string;
    public pontoSerial: string;
    public ca_id: string;
    public smartcard: string;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        private atendimentoDigitalService: AtendimentoDigitalService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.atendimentoDigital = new AtendimentoDigital();
        this.atendimentoDigital.motivo = this.motivo;
        this.findTipoTV();
        console.log(this.holderService.cadastro.rede.planta);

    }

    public addPonto() {
        if (this.pontoMac && this.pontoSerial) {
            let addPontos: AddPontos;
            addPontos = {
                mac: this.pontoMac,
                serial: this.pontoSerial,
                smartCard: this.smartcard,
                caId: this.ca_id
            }
            this.atendimentoDigital.pontos.push(addPontos);
            this.pontoMac = null;
            this.pontoSerial = null;
            this.smartcard = null;
            this.ca_id = null;
        } else {
            super.showAlert("Preencher todos os campos", "Por favor preencha todos os campos Serial e Mac.");
        }
    }

    public removePonto(addPontos: AddPontos) {
        let index: number = this.atendimentoDigital.pontos.findIndex(x => x.serial === addPontos.serial);
        this.atendimentoDigital.pontos.splice(index, 1);
    }

    public setAtendimento() {
        if (this.validForm()) {
            let count: number = 0;
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
                            if (count < this.holderService.rcount) {
                                count++;
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
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public findTipoTV() {
        if (this.holderService.cadastro.servicos.tipoTv) {
            if (this.holderService.cadastro.servicos.tipoTv.includes("DTH")) {
                this.atendimentoDigital.modeloTV === "TVDTH"
            } else if (this.holderService.cadastro.servicos.tipoTv.includes("HIBRIDO")) {
                this.atendimentoDigital.modeloTV === "TVHIBRIDA"
            } else if (this.holderService.cadastro.servicos.tipoTv.includes("IPV")) {
                this.atendimentoDigital.modeloTV === "IPTV"
            }
        }
    }

    public changeTipoTV() {
        // if (this.atendimentoDigital.tipoTV === "DVR") {
        this.atendimentoDigital.modeloTV = null;
        this.atendimentoDigital.detailIPTV = null;
        this.ca_id = null;
        this.smartcard = null;
        // }
    }

    public changeModeloTV() {
        this.atendimentoDigital.detailIPTV = null;
        this.ca_id = null;
        this.smartcard = null;
        if (this.holderService.cadastro.rede.planta === "VIVO2") {
            this.atendimentoDigital.detailIPTV = "OPEN_PLATAFORM";
        }
    }

    public validSendButton(): boolean {
        // debugger
        let valid: boolean = false;
        if (!this.atendimentoDigital.tipoTV || this.atendimentoDigital.pontos.length <= 0) {
            valid = true;
        }
        return valid;
    }

    public validForm(): boolean {
        let valid: boolean = true;
        if (this.atendimentoDigital.motivo) {
            if (this.atendimentoDigital.macHG) {
                if (this.atendimentoDigital.macHG.length > 17) {
                    this.atendimentoDigital.macHG = this.atendimentoDigital.macHG.substring(0, (this.atendimentoDigital.macHG.length - 1));
                }
                if (this.atendimentoDigital.macHG) {
                    let macFormat = this.atendimentoDigital.macHG.replace(/:/g, "").match(/.{1,2}/g).join(':');
                    // macFormat = macFormat.match(/.{1,2}/g).join(':');
                    this.atendimentoDigital.macHG = macFormat;
                    if (!this.testMAC(this.atendimentoDigital.macHG)) {
                        super.showAlert("Campo MAC", "Por favor digite um MAC valido.");
                        valid = false;
                    }
                } else {
                    super.showAlert("Campo MAC", "Por favor digite um MAC valido.");
                }
            } else {
                super.showAlert("Campo MAC", "Por favor digite um MAC valido.");
                valid = false;
            }
            if (this.atendimentoDigital.chkATA && this.atendimentoDigital.pontos.length < 1) {
                super.showAlert("Pontos ATA", "Por favor insira pelo menos um ATA.");
                valid = false;
            }

        } else {
            super.showAlert("Motivo", "Por favor selecione um motivo");
            valid = false;
        }
        return valid;
    }

    public testMAC(mac: string) {
        let regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
        return regex.test(mac);
    }

}