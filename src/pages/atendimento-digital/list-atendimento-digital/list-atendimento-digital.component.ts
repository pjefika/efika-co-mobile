import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { DescAtendimentoDigitalComponent } from './desc-atendimento-digital/desc-atendimento-digital.component';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
// import { AtendimentoDigitalOutput } from '../../../view-model/atendimento-digital/atendimento-digital-output';
import { Attendances, Tickets } from '../../../view-model/task-process/ticket-output';
import { TaskProcess } from '../../../view-model/task-process/task-process';
import { Output } from '../../../view-model/task-process/output-task';
import { ReOpenAntendimentoDigital } from '../../../view-model/atendimento-digital/atendimento-digital';
import { AtendimentoHold } from '../../../view-model/atendimento-digital/atendimento-digital-output';


@Component({
    selector: 'list-atendimento-digital',
    templateUrl: 'list-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class ListAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    private count: number = 0;
    public reOpenAntendimentoDigital: ReOpenAntendimentoDigital;
    private rqSi: any;
    public observacao: string;
    public atendimentoHold: AtendimentoHold;
    public atendimentoDigitalOutput: Tickets[] = [];

    public attendances: Attendances[] = [];

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
                                        this.atendimentoDigitalOutput = [];
                                        this.atendimentoDigitalOutput = resposta_1.output.tickets;
                                        console.log(this.atendimentoDigitalOutput);
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
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. Para avaliação de manobra, ligar no CO", this.holderService.instancia));
    }

    public openPopUpReOpenAtend() {
        // const mountListError = [];
        // this.listMotivoErro.forEach((me, i) => {
        //     let obj;
        //     obj = {
        //         name: i,
        //         type: 'radio',
        //         label: me.nome,
        //         value: me
        //     }
        //     mountListError.push(obj);
        // });
        const alert = this.alertCtrl.create({
            title: "Deseja reabrir o atendimento",
            subTitle: "Digite uma observação para reabertura.",
            inputs: [
                {
                    name: "obs",
                    type: "text",
                    placeholder: "Observação"
                }
            ],
            buttons: [{
                text: "Fechar",
                role: "cancel"
            }, {
                text: "Reabrir",
                handler: (data) => {
                    this.observacao = data.obs;
                    this.reOpenAtendimento();
                }
            }]
        });
        alert.present();
    }

    public reOpenAtendimento() {
        this.reOpenAntendimentoDigital = {
            atendimento: this.atendimentoHold.atendimento.id,
            tecnico: this.atendimentoHold.atendimento.tecnico.id,
            user: this.atendimentoHold.atendimento.user.id,
            observacao: this.observacao
        }
        // console.log(this.reOpenAntendimentoDigital);
        let count: number = 0;
        let qntErro: number = 0;
        this.loading(true, "Carregando atendimento");

        this.atendimentoDigitalService
            .updateAtendimento(this.reOpenAntendimentoDigital)
            .then(resposta => {
                if (resposta) {
                    this.rqSi = setInterval(() => {
                        if (count < this.holderService.rcount) {
                            count++;
                            this.atendimentoDigitalService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        clearInterval(this.rqSi);
                                        this.loading(false);
                                        this.navCtrl.pop();
                                        super.showAlert("Atendimento enviado", "Atendimento reaberto com sucesso.");
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
                    }, this.holderService.rtimeout - 8000);
                }
            }, error => {
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
                this.loading(false);
            });
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