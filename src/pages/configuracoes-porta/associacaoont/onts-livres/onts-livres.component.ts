import { Component, OnInit } from '@angular/core';
import { Ont } from '../../../../view-model/task-process/ont';
import { OntsLivresService } from './onts-livres.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { SuperConfPortaService } from '../../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Valids } from '../../../../view-model/fulltest/validacao';

@Component({
    selector: 'onts-livres-component',
    templateUrl: 'onts-livres.component.html',
    providers: [OntsLivresService]
})

export class OntsLivrsComponent extends SuperConfPortaService implements OnInit {

    public onts: Ont[];

    private count: number = 0;

    constructor(private ontsLivresService: OntsLivresService,
        public holderService: HolderService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.getOntsDisp();
    }

    private getOntsDisp() {
        this.count = 0;
        this.loading(true, "Aguarde, carregando ONT's...");
        this.ontsLivresService
            .getOntsDisp(this.holderService.instancia, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.ontsLivresService
                                .gettask(response.id)
                                .then(resposta => {
                                    this.startTimer();
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output, this.holderService.instancia)) {
                                            if (resposta.output.onts) {
                                                this.onts = resposta.output.onts;
                                                super.showAlert("ONT's", "Busca realizada com sucesso.");
                                            } else {
                                                super.showAlert("ONT's", "Não foram encontradas ONT's disponiveis");
                                                this.navCtrl.pop();
                                            }
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        } else {
                                            this.loading(false);
                                            clearInterval(rqSi);
                                            super.showAlert(super.makeexceptionmessageTitle("ONT's.", true), "Sem resposta no Output." + super.mountmsgexception(this.holderService.instancia));
                                        }
                                    }
                                }, error => {
                                    super.showAlert(error.tError, error.mError);
                                    this.loading(false);
                                    clearInterval(rqSi);
                                });
                            if (this.count === this.holderService.rcount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, error.mError);
            });
    }

    public setOnt(ont: Ont) {
        this.count = 0;
        this.loading(true, "Aguarde, associando ONT...");
        this.ontsLivresService
            .setOntsDisp(ont.serial, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    this.startTimer();
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.ontsLivresService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output, this.holderService.instancia)) {
                                            let idx: number = this.holderService.certification.fulltest.valids.map(function (e) { return e.nome; }).indexOf("Associação Serial ONT");
                                            let setValidOnt: Valids;
                                            setValidOnt = {
                                                foiCorrigido: true,
                                                mensagem: "Identificado ONT associada: " + resposta.output.serial.serial,
                                                nome: "Associação Serial ONT",
                                                resultado: true,
                                                result: {
                                                    nome: "Associação Serial ONT",
                                                    type: "--",
                                                    slot: this.holderService.cadastro.rede.slot,
                                                    porta: this.holderService.cadastro.rede.porta
                                                }
                                            }
                                            this.holderService.certification.fulltest.valids[idx] = setValidOnt;
                                            super.showAlert("ONT", "ONT Associada com sucesso, realize o Fulltest novamente.");
                                            this.navCtrl.pop();
                                            this.loading(false);
                                            clearInterval(rqSi);
                                        } else {
                                            this.loading(false);
                                            this.navCtrl.pop();
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                    this.loading(false);
                                    this.navCtrl.pop();
                                    clearInterval(rqSi);
                                });
                            if (this.count === this.holderService.rcount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.tempobuscaexcedido();
                            this.navCtrl.pop();
                            clearInterval(rqSi);
                        }
                    }, 15000);
                }
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

    /**
     * 
     * @param ont Retorna verdadeiro ou falso para habilitar botão de associar de acordo com sua respectivo slot e porta.
     */
    public btnAssocDisable(ont: Ont): boolean {
        let valid: boolean = false;
        if (ont.slot === this.holderService.cadastro.rede.slot && ont.porta === this.holderService.cadastro.rede.porta) {
            valid = true;
        }
        return valid;
    }

}