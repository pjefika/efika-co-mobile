import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { RoboManobraService } from './robo-manobra.service';
import { Primaria } from '../../view-model/robo-manobra/primaria';
import { CTO } from '../../view-model/robo-manobra/cto';
import { Secundaria } from '../../view-model/robo-manobra/secundaria';

@Component({
    selector: 'robo-manobra-component',
    templateUrl: 'robo-manobra.component.html',
    providers: [RoboManobraService]
})

export class RoboManobraComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    public ableFormRoboManobra: boolean = false;

    public disableBtnVerificarDisp: boolean = false;

    public showBtnVerificarSituacaoManobra: boolean = false;

    public tipoTecnologia: string = "FTTA";
    public numeroInstancia: string;
    public motivoManobra: string;

    public selectedPrimaria: Primaria;
    public selectedCTO: CTO;
    public selectecSecundaria: Secundaria = new Secundaria();

    public incrementTimeCount: number = 50;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private roboManobraService: RoboManobraService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public doVerificarDisponibilidade() {
        if (this.holderService.isMock) {
            this.verificarDisponibilidadeMock();
        } else {
            this.verificarDisponibilidade();
        }

    }

    public verificarDisponibilidade() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Verificando disponibilidade");
        this.roboManobraService
            .setTaskRoboManobra(this.tipoTecnologia, "1150836325"/*this.holderService.cadastro.instancia*/)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount + this.incrementTimeCount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        if (super.validState(resposta_1.output, this.holderService.instancia)) {
                                            this.holderService.roboManobra = resposta_1.output;
                                            this.loading(false);
                                            this.ableFormRoboManobra = true;
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                });
                            if (this.count === this.holderService.rcount + this.incrementTimeCount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.loading(false);
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                } else {
                    this.loading(false);
                    super.showAlert(super.makeexceptionmessageTitle("Ocorreu algo.", true), super.makeexceptionmessage(resposta.exceptionMessage, this.holderService.instancia));
                }
                // console.log(resposta);
                // this.loading(false);
                // this.disableBtnVerificarDisp = true;
                // this.ableFormRoboManobra = true;
            }, error => {
                this.loading(false);
                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
            });
    }

    public doManobrar() {
        this.manobrar();
        // if (this.holderService.isMock) {
        // } else {
        // }
    }

    private manobrar() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Realizando manobra");
        this.roboManobraService.setTaskRoboManuevers(this.holderService.roboManobra.id_solicitacao, this.holderService.cadastro.instancia, this.motivoManobra, this.tipoTecnologia, this.selectedPrimaria.codprimaria, this.selectecSecundaria.codsecundaria)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount + this.incrementTimeCount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        if (super.validState(resposta_1.output, this.holderService.instancia)) {
                                            this.holderService.roboManobrado = resposta_1.output;


                                            switch (this.holderService.roboManobrado.resultado_manobra) {
                                                case "Pendente":

                                                    break;
                                                case "Em Processamento":

                                                    break;
                                                case "Erro":

                                                    break;
                                            }

                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    qntErro++;
                                    if (qntErro > 3) {
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                        this.loading(false);
                                        clearInterval(rqSi);
                                    }
                                });
                            if (this.count === this.holderService.rcount + this.incrementTimeCount) {
                                this.tempobuscaexcedido();
                                clearInterval(rqSi);
                            }
                        } else {
                            this.loading(false);
                            this.tempobuscaexcedido();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            });
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public verificarDisponibilidadeMock() {
        this.loading(true, "Verificando disponibilidade");
        setTimeout(() => {
            this.holderService.roboManobra = this.roboManobraService.getmanobradispMock().output;
            this.ableFormRoboManobra = true;
            this.loading(false);
        }, 100);
    }

}