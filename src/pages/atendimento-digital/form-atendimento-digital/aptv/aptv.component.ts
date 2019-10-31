import { Component, OnInit, Input } from '@angular/core';
import { AtendimentoDigital, AddPontos } from '../../../../view-model/atendimento-digital/atendimento-digital';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { LoadingController, AlertController, NavController } from 'ionic-angular';
import { AtendimentoDigitalService } from '../../atendimento-digital.service';
import { MotivoErroAtendimentoDigital } from '../../../../view-model/atendimento-digital/motivo-erro-atendimento-digital';

@Component({
    selector: 'aptv-component',
    templateUrl: 'aptv.component.html',
    providers: [AtendimentoDigitalService]
})

export class AptvComponent extends SuperComponentService implements OnInit {

    @Input()
    public motivo: string;

    public atendimento: AtendimentoDigital;


    public addMacPonto: string;
    public addSerialPonto: string;

    public addCaIDPonto: string;
    public addSmartCardPonto: string;

    public tipoEquipamento: string;

    public listErrorMotivo: MotivoErroAtendimentoDigital[];

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        private atendimentoDigitalService: AtendimentoDigitalService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.atendimento = new AtendimentoDigital();
        this.atendimento.motivo = this.motivo;
        this.getMotivos();
    }

    public validContinueFormATDG() {
        let valid: boolean = false;
        // Validações IPTV
        if (this.atendimento.tecnologiaTV === 'IPTV') {
            if (this.atendimento.tipoTV && this.tipoEquipamento) {
                valid = true;
            }
        } else {
            if (this.tipoEquipamento) {
                valid = true;
            }
        }
        return valid;
    }

    public addPontos() {
        if (this.validAddPonto()) {
            if (this.validMAC()) {
                let addPontos: AddPontos = new AddPontos();
                addPontos = {
                    mac: this.addMacPonto,
                    serial: this.addSerialPonto,
                    smartCard: this.addSmartCardPonto,
                    caId: this.addCaIDPonto,
                    tipoEquipamento: this.tipoEquipamento
                }
                this.atendimento.pontos.push(addPontos);
                this.addMacPonto = null;
                this.addSerialPonto = null;
                this.addSmartCardPonto = null;
                this.addCaIDPonto = null;
                // this.tipoEquipamento = null;
            } else {
                super.showAlert("Campo MAC", "Por favor digite um MAC valido para o ponto.");
            }
        } else {
            super.showAlert("Preencher todos os campos", "Por favor preencha todos os campos do formulário.");
        }
    }

    public removePonto(addPontos: AddPontos) {
        let index: number = this.atendimento.pontos.findIndex(x => x.serial === addPontos.serial);
        this.atendimento.pontos.splice(index, 1);
    }

    public validAddPonto() {
        let valid: boolean = false;
        if (this.addMacPonto && this.addSerialPonto) {
            if (this.atendimento.tecnologiaTV === 'IPTV'
                && this.atendimento.tipoTV === 'OPEN_PLATAFORM'
                && (this.tipoEquipamento === 'STB'
                    || this.tipoEquipamento === 'DVR')) {
                if (this.addSmartCardPonto) {
                    valid = true;
                }
            } else if (this.atendimento.tecnologiaTV === 'DTH'
                && (this.tipoEquipamento === 'DECODER'
                    || this.tipoEquipamento === 'DVR')) {
                if (this.addSmartCardPonto) {
                    valid = true;
                }
            } else {
                valid = true;
            }
        }
        return valid;
    }

    public validMAC() {
        let valid: boolean = false;
        if (this.addMacPonto.length > 17) {
            this.addMacPonto = this.addMacPonto.substring(0, (this.addMacPonto.length - 1));
        }
        let macFormat = this.addMacPonto.replace(/:/g, "").match(/.{1,2}/g).join(':');
        this.addMacPonto = macFormat;
        if (this.testMAC(this.addMacPonto)) {
            valid = true;
        }
        return valid;
    }

    public validSeEnviaForm() {
        let valid: boolean = false;
        if (this.atendimento.serial && this.atendimento.mac && this.atendimento.pontos.length > 0) {
            valid = true;
        }
        return valid;
    }

    public testMAC(mac: string) {
        let regex = /^([a-fA-F0-9]{2}[:-]){5}([a-fA-F0-9]{2})$/;
        return regex.test(mac);
    }

    public changeTecnologiaTV() {
        this.atendimento.tipoTV = null;
        this.tipoEquipamento = null;
        this.atendimento.pontos = [];
    }

    public changeTipoTV() {
        this.tipoEquipamento = null;
    }


    public setAtendimento() {
        let count: number = 0;
        let qntErro: number = 0;
        this.loading(true, "Enviando atendimento");

        if (this.atendimento.mac.length > 17) {
            this.atendimento.mac = this.atendimento.mac.substring(0, (this.atendimento.mac.length - 1));
        }
        let macFormat = this.atendimento.mac.replace(/:/g, "").match(/.{1,2}/g).join(':');
        this.atendimento.mac = macFormat;
        if (this.testMAC(this.atendimento.mac)) {

            this.atendimento.nomeTecnico = this.holderService.user.name;
            this.atendimento.matriculaTecnico = this.holderService.user.matricula;
            this.atendimento.telefoneTecnico = this.holderService.user.phone;
            this.atendimento.emailTecnico = this.holderService.user.email;

            this.atendimento.fkId = this.holderService.certification.fkId;
            this.atendimento.instancia = this.holderService.instancia;

            this.atendimentoDigitalService
                .setAtendimento(this.atendimento)
                .then(resposta => {
                    if (resposta) {
                        let rqSi = setInterval(() => {
                            if (count < this.holderService.rcount) {
                                count++;
                                this.atendimentoDigitalService
                                    .gettask(resposta.id)
                                    .then(_resposta => {
                                        if (_resposta.state === "EXECUTED") {
                                            if (_resposta.output.state != "EXCEPTION") {
                                                if (_resposta.output.solicitacao.httpStatus === "ALREADY_REPORTED") {
                                                    super.showAlert("Alerta", "Solicitação já enviada, não sendo possivel enviar para ao mesmo motivo.");
                                                } else {
                                                    super.showAlert("Sucesso", "Atendimento Enviado com sucesso, por favor aguarde.");
                                                }
                                            } else {
                                                super.showAlert("Ops aconteceu algo", "Ocorreu um erro ao enviar esta solicitação, por favor tente novamente. " + _resposta.output.resultado);
                                            }
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
                                clearInterval(rqSi)
                            }
                        }, this.holderService.rtimeout);
                    }
                }, error => {
                    this.loading(false);
                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                });
        } else {
            this.loading(false);
            super.showAlert("Campo MAC", "Por favor digite um MAC valido para o modem.");
        }
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. Para avaliação de manobra, ligar no CO", this.holderService.instancia));
    }

    public getMotivos() {
        this.loading(true, "Buscando motivos");
        this.atendimentoDigitalService
            .getMotivos()
            .then(resposta => {
                this.listErrorMotivo = resposta;
            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
            })
            .then(() => {
                this.loading(false);
            })
    }

    public validShowOptionsInMotivosError(nomeErro: string) {
        if (nomeErro.includes('Tela de Aprovisionamento') && this.atendimento.tecnologiaTV === 'TVDTH') {
            return true;
        } else if (nomeErro.includes('Erro 1401') && this.atendimento.tecnologiaTV === 'TVHIBRIDA') {
            return true;
        } else if (nomeErro.includes('5/12') && this.atendimento.tipoTV === 'OPENPLATAFORM') {
            return true;
        } else if (nomeErro.includes('X3') && this.atendimento.tipoTV === 'MEDIAROOM') {
            return true;
        }
    }

}