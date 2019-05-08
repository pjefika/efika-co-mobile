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
        if (this.pontoMac && this.pontoSerial) {
            let addPontos: AddPontos;
            addPontos = {
                mac: this.pontoMac,
                serial: this.pontoSerial
            }
            this.atendimentoDigital.pontos.push(addPontos);
            this.pontoMac = null;
            this.pontoSerial = null;
        } else {
            super.showAlert("Preencher todos os campos", "Por favor preencha todos os campos Serial e Mac.");
        }
    }

    public removePonto(addPontos: AddPontos) {
        let index: number = this.atendimentoDigital.pontos.findIndex(x => x.serial === addPontos.serial);
        this.atendimentoDigital.pontos.splice(index, 1);
    }

    public setAtendimento() {
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

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }


}