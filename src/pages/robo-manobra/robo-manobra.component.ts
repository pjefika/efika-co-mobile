import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { RoboManobraService } from './robo-manobra.service';
import { Primaria } from '../../view-model/robo-manobra/primaria';
import { CTO } from '../../view-model/robo-manobra/cto';
import { Secundaria } from '../../view-model/robo-manobra/secundaria';
import { RoboHolderIdsService } from '../../providers/holder/robo-holder-ids.service';

@Component({
    selector: 'robo-manobra-component',
    templateUrl: 'robo-manobra.component.html',
    providers: [RoboManobraService]
})

export class RoboManobraComponent extends SuperComponentService implements OnInit {

    private count: number = 0;

    public tipoTecnologia: string = "FTTA";
    public motivoManobra: string;

    public selectedPrimaria: Primaria;
    public selectedCTO: CTO;
    public selectecSecundaria: Secundaria = new Secundaria();

    public primariaInput: string;

    public incrementTimeCount: number = 80;

    public equipamento: string;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private roboManobraService: RoboManobraService,
        public roboHolderIdsService: RoboHolderIdsService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        console.log(this.holderService.cadastro.instancia);
        
        if (this.roboHolderIdsService.ableFormRoboManobra !== true && this.roboHolderIdsService.ableActionVerifySitManobra !== true) {
            this.roboHolderIdsService.ableFormVerifyDispManobra = true;
        }
    }

    public doVerificarDisponibilidade() {
        // if (this.validFormDisponibilidade()) {
        if (this.holderService.isMock) {
            // this.verificarDisponibilidadeMock();
            this.verificarDisponibilidade();
        } else {
            this.verificarDisponibilidade();
        }
        // } else {
        //     super.showAlert("Formulário incorreto", "Por favor preencha todos os campos do formulário");
        // }
    }

    public verificarDisponibilidade() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Verificando disponibilidade");
        this.roboManobraService
            .setTaskRoboManobra(this.tipoTecnologia, this.holderService.cadastro.instancia, this.primariaInput, this.equipamento)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount + this.incrementTimeCount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        if (resposta_1.output.primaria) {
                                            if (resposta_1.output.primaria.length > 0 || resposta_1.output.observacao !== "Tecnologia não confere com o físico. Necessário contatar o Backoffice") {
                                                this.holderService.roboManobra = resposta_1.output;
                                                this.roboHolderIdsService.ableFormVerifyDispManobra = false;
                                                this.roboHolderIdsService.ableFormRoboManobra = true;
                                            } else {
                                                super.showAlert("Ops, aconteceu algo", resposta_1.output.observacao);
                                            }
                                        } else {
                                            super.showAlert("Ops, aconteceu algo", resposta_1.output.observacao);
                                        }
                                        this.loading(false);
                                        clearInterval(rqSi);
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

    public verificarDisponibilidadeMock() {
        this.loading(true, "Verificando disponibilidade");
        setTimeout(() => {
            this.holderService.roboManobra = this.roboManobraService.getmanobradispMock().output;
            this.roboHolderIdsService.ableFormVerifyDispManobra = false;
            this.roboHolderIdsService.ableFormRoboManobra = true;
            this.loading(false);
        }, 60000);
    }

    public validFormDisponibilidade(): boolean {
        let valid: boolean = false;
        if (this.primariaInput /*|| this.idSpliter || this.tipoTecnologia*/) {
            valid = true;
        }
        return valid;
    }

    public doManobrar() {
        if (this.validFormManobrar()) {
            if (this.holderService.isMock) {
                // this.manobrarMock();
                this.manobrar();
            } else {
                this.manobrar();
            }
        }
    }

    private manobrar() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Realizando manobra");
        this.roboManobraService
            .setTaskRoboManuevers(this.holderService.roboManobra.id_solicitacao,
                this.holderService.cadastro.instancia,
                this.motivoManobra,
                this.tipoTecnologia,
                this.selectedPrimaria.codprimaria,
                this.selectecSecundaria.codsecundaria,
                this.holderService.roboManobra.statusPorta,
                this.selectedCTO.codcto)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount + this.incrementTimeCount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        this.holderService.roboManobrado = resposta_1.output;
                                        if (resposta_1.output.resultado_manobra === "Concluido") {
                                            super.showAlert("Informação", "Status da manobra: " + this.holderService.roboManobrado.resultado_manobra);
                                            this.roboHolderIdsService.ableFormRoboManobra = false;
                                            this.roboHolderIdsService.ableActionVerifySitManobra = true;
                                        } else {
                                            super.showAlert("Informação", "Status da manobra: " + this.holderService.roboManobrado.resultado_manobra);
                                        }
                                        this.loading(false);
                                        clearInterval(rqSi);
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

    private manobrarMock() {
        this.loading(true, "Verificando disponibilidade");
        setTimeout(() => {
            this.holderService.roboManobrado = this.roboManobraService.getmanobradoMock().output;
            if (this.holderService.roboManobrado.resultado_manobra === "Concluida") {
                super.showAlert("Informação", "Status da manobra: " + this.holderService.roboManobrado.resultado_manobra);
                this.roboHolderIdsService.ableFormRoboManobra = false;
                this.roboHolderIdsService.ableActionVerifySitManobra = true;
            } else {
                super.showAlert("Informação", "Status da manobra: " + this.holderService.roboManobrado.resultado_manobra);
            }
            this.loading(false);
        }, 60000);
    }

    private validFormManobrar(): boolean {
        let valid: boolean = false;
        if (this.motivoManobra || this.selectedPrimaria || this.selectecSecundaria) {
            valid = true;
        }
        return valid;
    }

    public doVerifySituacaoManobra() {
        if (this.holderService.isMock) {
            // this.getVerifySituacaoManobraMock();
            this.getVerifySituacaoManobra();
        } else {
            this.getVerifySituacaoManobra();
        }
    }

    private getVerifySituacaoManobra() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Verificando manobra");
        this.roboManobraService
            .setTaskManobraProvisioning(this.holderService.roboManobrado.id_solicitacao, this.holderService.cadastro.instancia)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount + this.incrementTimeCount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta_1 => {
                                    if (resposta_1.state === "EXECUTED") {
                                        if (resposta_1.output.resultado_manobra === "Em Manobra"
                                            || resposta_1.output.resultado_manobra === "Ativo Parcial Insadi") {
                                            this.roboHolderIdsService.ableActionVerifySitManobra = true;
                                        } else {
                                            this.roboHolderIdsService.ableActionVerifySitManobra = false;
                                        }
                                        super.showAlert("Sucesso", "Mensagem: " + resposta_1.output.resultado_manobra + " / " + resposta_1.output.alerta);
                                        this.loading(false);
                                        clearInterval(rqSi);
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

    public getVerifySituacaoManobraMock() {
        this.loading(true, "Verificando manobra");
        setTimeout(() => {
            this.holderService.roboManobrado = this.roboManobraService.getsituacaomanobraMock().output;
            if (this.holderService.roboManobrado.resultado_manobra === "Em Manobra"
                || this.holderService.roboManobrado.resultado_manobra === "Ativo Parcial Insadi") {
                this.roboHolderIdsService.ableActionVerifySitManobra = true;
            } else {
                this.roboHolderIdsService.ableActionVerifySitManobra = false;
            }
            super.showAlert("Sucesso", "Mensagem: " + this.holderService.roboManobrado.resultado_manobra + " / " + this.holderService.roboManobrado.alerta);
            this.loading(false);

            this.loading(false);
        }, 60000);

    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    private resetAllStatusManobra() {
        this.roboHolderIdsService.ableFormRoboManobra = false;
        this.roboHolderIdsService.ableActionVerifySitManobra = false;

        this.tipoTecnologia = "FTTA";
        this.primariaInput = "";
        this.equipamento = "";

        this.motivoManobra = null;
        this.selectedPrimaria = null;
        this.selectedCTO = null;

        this.holderService.roboManobra = null;
        this.holderService.roboManobrado = null;

        this.roboHolderIdsService.ableFormVerifyDispManobra = true;
    }

    public areYouSureRefreshManobraInfo() {
        let alert = this.alertCtrl.create({
            title: "Resetar informações",
            subTitle: "Deseja realizar o reset das informações buscadas de manora?",
            buttons: [{
                text: "Não",
                role: "cancel"
            }, {
                text: "Sim",
                handler: () => {
                    this.resetAllStatusManobra();
                }
            }]
        });
        alert.present();
    }

}