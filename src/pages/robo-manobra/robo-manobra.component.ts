import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { RoboManobraService } from './robo-manobra.service';

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

    public tipoTecnologia: string;
    public numeroInstancia: string;
    public motivoManobra: string;

    constructor(public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public holderService: HolderService,
        private roboManobraService: RoboManobraService) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public verificarDisponibilidade() {
        this.count = 0;
        let qntErro: number = 0;
        this.loading(true, "Verificando disponibilidade");
        this.roboManobraService
            .setTaskRoboManobra(this.tipoTecnologia, this.holderService.cadastro.instancia, this.motivoManobra)
            .then(resposta => {
                if (resposta) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.roboManobraService
                                .gettask(resposta.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output, this.holderService.instancia)) {

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
                            if (this.count === this.holderService.rcount /*&& this.holderService.certification*/) {
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

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
    }

    public doManobrar() {
        this.loading(true, "Realizando Manobra");
        setTimeout(() => {
            this.loading(false);
            if (true) {
                // this.validSituacaoManobra();
                this.showBtnVerificarSituacaoManobra = true;
                this.ableFormRoboManobra = false;
            } else {
                super.showAlert("Ops, aconteceu algo", "Não foi possivel realizar a manobra");
            }
        }, 2000);
    }

    public validSituacaoManobra() {
        this.loading(true, "Validando situação da manobra");
        setTimeout(() => {
            this.loading(false);
            if (true) {
                super.showAlert("Sucesso", "Manobra realizada com sucesso.");
            } else {
                super.showAlert("Ops, aconteceu algo", "Situação da manobra sem resposta...");
            }
        }, 2000);
    }

    public verificarDisponibilidadeMock() {
        this.loading(true, "Verificando disponibilidade");
        setTimeout(() => {
            this.loading(false);
            if (true) {
                // habilita form
                super.showAlert("Disponibilidade", "Disponibilidade ok, por favor preencha o formulário.");
                this.disableBtnVerificarDisp = true;
                this.ableFormRoboManobra = true;
            } else {
                // Sem Portas  disponiveis
                super.showAlert("Portas Indisponiveis", "Não há portas disponiveis");
            }
        }, 2000);
    }

    public doManobrarMock() {
        this.loading(true, "Realizando Manobra");
        setTimeout(() => {
            this.loading(false);
            if (true) {
                // this.validSituacaoManobra(); 
                this.showBtnVerificarSituacaoManobra = true;
                this.ableFormRoboManobra = false;
            } else {
                super.showAlert("Ops, aconteceu algo", "Não foi possivel realizar a manobra");
            }
        }, 2000);
    }

    public validSituacaoManobraMock() {
        this.loading(true, "Validando situação da manobra");
        setTimeout(() => {
            this.loading(false);
            if (true) {
                super.showAlert("Sucesso", "Manobra realizada com sucesso.");
            } else {
                super.showAlert("Ops, aconteceu algo", "Situação da manobra sem resposta...");
            }
        }, 2000);
    }

    public validFields() {



    }

}