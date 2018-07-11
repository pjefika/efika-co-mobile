import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { CadastroService } from '../cadastro.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';

@Component({
    selector: 'cadastro-search-component',
    templateUrl: 'cadastro-search.component.html',
    providers: [CadastroService]
})

export class CadastroSearchComponent extends SuperComponentService implements OnInit {

    public jaBuscou: boolean = false;

    private count: number = 0;

    constructor(public holderService: HolderService,
        private cadastroService: CadastroService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() { }

    //Busca cadastro.
    public getCadastro() {
        this.resetHolder();
        setTimeout(() => {
            if (this.holderService.isMock) {
                // --Mock
                this.getCadastroMock("Consultando Cadastro Mock");
            } else {
                // --Prod
                this.buscaCadastro("Consultando Cadastro");
            }
        }, 1);
    }

    public buscaCadastro(mensagem: string) {
        this.count = 0;
        if (this.validInstancia()) {
            this.loading(true, mensagem);
            this.startTimer();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    if (response) {
                        let rqSi = setInterval(() => {
                            if (this.count < this.holderService.rcount) {
                                this.count++;
                                this.cadastroService
                                    .gettask(response.id)
                                    .then(resposta => {
                                        if (resposta.state === "EXECUTED") {
                                            if (super.validState(resposta.output, this.holderService.instancia)) {
                                                if (super.validCustomer(resposta.output, this.holderService.instancia)) {
                                                    this.holderService.cadastro = resposta.output.customer;
                                                    this.holderService.tabCadastroAtivo = true;
                                                    setTimeout(() => {
                                                        this.navCtrl.parent.select(1);
                                                    }, 1);
                                                    this.validDSLAM();
                                                    this.msgEventoMassivo();
                                                    this.loading(false);
                                                    this.ativo = false;
                                                    this.jaBuscou = true;
                                                    this.holderService.btnFazFulltestAtivo = true;
                                                    clearInterval(rqSi);
                                                } else {
                                                    this.loading(false);
                                                    clearInterval(rqSi);
                                                    this.holderService.btnFazFulltestAtivo = false;
                                                }
                                            } else {
                                                this.loading(false);
                                                this.msgEventoMassivo();
                                                this.jaBuscou = true;
                                                clearInterval(rqSi);
                                            }
                                        }
                                    }, error => {
                                        this.loading(false);
                                        super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
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
                    } else {
                        this.loading(false);
                        super.showAlert(super.makeexceptionmessageTitle("Erro ao realizar busca de cadastro.", true), super.makeexceptionmessage(response.exceptionMessage, this.holderService.instancia));
                    }
                }, error => {
                    this.loading(false);
                    super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                    console.log("Deu erro -- error --!!! AMD p(o.o)q");
                });
        }
    }

    private tempobuscaexcedido() {
        this.loading(false);
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido.", true), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. ", this.holderService.instancia));
        this.jaBuscou = true;
    }

    private startTimer() {
        this.doTimer((this.holderService.rcount * this.holderService.rtimeout) / 1000);
    }

    public getCadastroMock(mensagem: string) {
        this.loading(true, mensagem);
        this.startTimer();
        setTimeout(() => {
            this.holderService.cadastro = this.cadastroService.getCadastroMock().output.customer;
            this.holderService.tabCadastroAtivo = true;
            setTimeout(() => {
                this.navCtrl.parent.select(1);
            }, 1);
            this.validDSLAM();
            this.msgEventoMassivo();
            this.loading(false);
            this.ativo = false;
            this.jaBuscou = true;
            this.holderService.btnFazFulltestAtivo = true;
        }, 5000);
        // }
    }

    private resetHolder() {
        this.holderService.tabCadastroAtivo = false;
        this.holderService.tabFulltestAtivo = false;
        this.holderService.cadastro = null;
        this.holderService.certification = null;
    }

    public msgEventoMassivo() {
        if (this.haveEventoMassivo()) {
            super.showAlert("Evento Massivo", "Este cadastro possui um evento massivo, podendo ocorrer problemas nos testes e correções.");
        }
    }

    public haveEventoMassivo(): boolean {
        if (this.holderService.cadastro) {
            if (this.holderService.cadastro.eventos.length > 0) {
                return true;
            }
        }
        return false;
    }

    public validInstancia(): boolean {
        let valid: boolean = false;
        if (this.holderService.instancia != null && this.holderService.instancia != undefined) {
            this.holderService.instancia = this.holderService.instancia.trim();
            if (this.holderService.instancia.length === 10) {
                valid = true;
            } else {
                super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância ou verifique se a mesma está correta, o campo não pode estar vazio ou estar faltando digitos a instância consiste em 10 digitos contando o DDD + o número. Ex:4112345678.");
            }
        } else {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância ou verifique se a mesma está correta, o campo não pode estar vazio ou estar faltando digitos a instância consiste em 10 digitos contando o DDD + o número. Ex:4112345678.");
        }
        return valid;
    }

    private validDSLAM() {
        if (this.holderService.cadastro.rede.modeloDslam === "LIADSLPT48"
            || this.holderService.cadastro.rede.modeloDslam === "VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "VDPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE"
            || this.holderService.cadastro.rede.modeloDslam === "LI-VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT-C_SIP") {
            super.showAlert(super.makeexceptionmessageTitle("Atenção.", true), "Modelo de DSLAM não implementado, não sendo possivel realizar o Fulltest, necessário contato com o Centro de Operações.");
        }
    }

}