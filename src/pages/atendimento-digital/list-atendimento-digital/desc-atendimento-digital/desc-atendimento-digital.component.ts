import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';
import { LoadingController, AlertController, NavParams, NavController } from 'ionic-angular';
import { HolderService } from '../../../../providers/holder/holder.service';
import { ReOpenAntendimentoDigital } from '../../../../view-model/atendimento-digital/atendimento-digital';
import { AtendimentoDigitalOututDetail } from '../../../../view-model/atendimento-digital/atendimento-digital-output';
import { AtendimentoDigitalService } from '../../atendimento-digital.service';

@Component({
    selector: 'desc-atendimento-digital',
    templateUrl: 'desc-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class DescAtendimentoDigitalComponent extends SuperComponentService implements OnInit {

    public observacao: string;

    public reOpenAntendimentoDigital: ReOpenAntendimentoDigital;

    public atendimentoDigitalOututDetail: AtendimentoDigitalOututDetail;

    private rqSi: any;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        private atendimentoDigitalService: AtendimentoDigitalService,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        // console.log(this.navParams.get('desc'));
        this.atendimentoDigitalOututDetail = this.navParams.get('desc') as AtendimentoDigitalOututDetail;
    }

    public reOpenAtendimento() {
        this.reOpenAntendimentoDigital = {
            atendimento: this.atendimentoDigitalOututDetail.id,
            tecnico: this.atendimentoDigitalOututDetail.tecnico.id,
            user: this.atendimentoDigitalOututDetail.user.id,
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

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }


    public openPopUpReOpenAtend() {
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

    public openObservacoesReaberturas(obs: string) {
        const alert = this.alertCtrl.create({
            title: "Informações Reaberturas",
            subTitle: obs,
            buttons: [{
                text: "Fechar",
                role: "cancel"
            }]
        });
        alert.present();
    }

    public getMotivosTranslate() {
        let nome: string;
        switch (this.atendimentoDigitalOututDetail.ticket.motivo) {
            case "APTV":
                nome = "Aprovisionamento TV";
                break;
            case "ATSIP":
                nome = "Ativação SIP";
                break;
        }
        return nome;
    }

    public nomesMatriculas(matriculaTecnico: string, matriculaUser: string) {
        let nome: string;
        if (this.holderService.user.matricula === matriculaTecnico) {
            nome = "Você: "
        } else {
            nome = matriculaUser + ": ";
        }
        return nome;
    }

}