import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { DescAtendimentoDigitalComponent } from './desc-atendimento-digital/desc-atendimento-digital.component';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { AtendimentoDigitalOutput } from '../../../view-model/atendimento-digital/atendimento-digital-output';

@Component({
    selector: 'list-atendimento-digital',
    templateUrl: 'list-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class ListAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    private rqSi: any;

    public atendimentoDigitalOutput: AtendimentoDigitalOutput[];

    constructor(private atendimentoDigitalService: AtendimentoDigitalService,
        public navCtrl: NavController,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl, holderService);

    }

    public ngOnInit() {
        this.getAtendimentos();
    }

    public getAtendimentos() {

        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Buscando atendimentos");

        this.atendimentoDigitalService
            .getAtendimentos()
            .then(resposta => {

                if (resposta) {
                    this.rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.atendimentoDigitalService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        this.atendimentoDigitalOutput = resposta_1.output.tickets;
                                        clearInterval(this.rqSi);
                                        this.loading(false);
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        this.loading(false);
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        clearInterval(this.rqSi);
                                    }
                                });
                        } else {
                            this.tempobuscaexcedido();
                            clearInterval(this.rqSi);
                        }
                    }, this.holderService.rtimeout - 12000);
                }

            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                this.loading(false);
            })
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public openDescAtendimentoDigital(idAtdg: number) {

        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Carregando atendimento");

        this.atendimentoDigitalService
            .getAtendimento(idAtdg)
            .then(resposta => {
                if (resposta) {
                    this.rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.atendimentoDigitalService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        if (resposta_1.output.atendimento.atendimento && resposta_1.output.atendimento.atendimento.situacao === "EM_ATENDIMENTO") {
                                            clearInterval(this.rqSi);
                                            super.showAlert("Ticket em atendimento", "Ticket está em atendimento por favor aguarde.");
                                            this.loading(false);
                                        } else {
                                            if (resposta_1.output
                                                && resposta_1.output.atendimento
                                                && resposta_1.output.atendimento.atendimento
                                                && resposta_1.output.atendimento.atendimento.id != null) {
                                                this.navCtrl.push(DescAtendimentoDigitalComponent, { desc: resposta_1.output.atendimento });
                                                clearInterval(this.rqSi);
                                                this.loading(false);
                                            } else {
                                                clearInterval(this.rqSi);
                                                this.loading(false);
                                                super.showAlert("Atendimento não tratado", "Atendimento ainda não foi tratado, por favor aguarde.");
                                            }
                                        }
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        this.loading(false);
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        clearInterval(this.rqSi);
                                    }
                                });
                        } else {
                            this.tempobuscaexcedido();
                            clearInterval(this.rqSi);
                        }
                    }, this.holderService.rtimeout - 12000);
                }
            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                this.loading(false);
            });
    }

    public ngOnDestroy() {
        clearInterval(this.rqSi);
    }

}