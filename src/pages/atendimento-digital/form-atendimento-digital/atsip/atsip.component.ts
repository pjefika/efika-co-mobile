import { Component, OnInit, Input } from '@angular/core';
import { AtendimentoDigital, AddPontos } from '../../../../view-model/atendimento-digital/atendimento-digital';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { AtendimentoDigitalService } from '../../atendimento-digital.service';

@Component({
    selector: 'atsip-component',
    templateUrl: 'atsip.component.html',
    providers: [AtendimentoDigitalService]
})

export class AtsipComponent extends SuperComponentService implements OnInit {

    @Input()
    public motivo: string;

    public atendimentoDigital: AtendimentoDigital;

    public pontoMac: string;
    public pontoSerial: string;

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
    }

    public addPonto() {
        if (this.validAddPonto()) {
            if (this.validMAC()) {
                let addPontos: AddPontos;
                addPontos = {
                    mac: this.pontoMac,
                    serial: this.pontoSerial,
                    tipoEquipamento: ""
                }
                this.atendimentoDigital.pontos.push(addPontos);
                this.pontoMac = null;
                this.pontoSerial = null;
            } else {
                super.showAlert("Campo MAC", "Por favor digite um MAC valido para o ponto.");
            }
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
        } else {
            super.showAlert("Preencher todos os campos", "Por favor preencha todos os campos do formulário.");
        }
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public validForm(): boolean {
        let valid: boolean = false;
        if (this.atendimentoDigital.mac) {

            if (this.atendimentoDigital.mac.length > 17) {
                this.atendimentoDigital.mac = this.atendimentoDigital.mac.substring(0, (this.atendimentoDigital.mac.length - 1));
            }
            let macFormat = this.atendimentoDigital.mac.replace(/:/g, "").match(/.{1,2}/g).join(':');
            this.atendimentoDigital.mac = macFormat;

            if (this.testMAC(this.atendimentoDigital.mac) && this.atendimentoDigital.serial) {
                if (this.atendimentoDigital.chkATA) {
                    if (this.atendimentoDigital.pontos.length > 0) {
                        valid = true;
                    }
                } else {
                    valid = true;
                }
            }

        }

        return valid;
    }

    public testMAC(mac: string) {
        let regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
        return regex.test(mac);
    }

    public validAddPonto() {
        let valid: boolean = false;
        if (this.pontoMac && this.pontoSerial) {
            valid = true;
        }
        return valid;
    }

    public validMAC() {
        let valid: boolean = false;
        if (this.pontoMac.length > 17) {
            this.pontoMac = this.pontoMac.substring(0, (this.pontoMac.length - 1));
        }
        let macFormat = this.pontoMac.replace(/:/g, "").match(/.{1,2}/g).join(':');
        this.pontoMac = macFormat;
        if (this.testMAC(this.pontoMac)) {
            valid = true;
        }
        return valid;
    }

}