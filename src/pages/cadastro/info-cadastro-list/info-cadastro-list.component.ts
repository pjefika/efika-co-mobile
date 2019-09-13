import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { Cadastro } from '../../../view-model/cadastro/cadastro';

import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { InfoRedeComponent } from './info-rede/info-rede.component';
import { InfoRedeExternaComponent } from './info-rede-externa/info-rede-externa.component';
import { InfoGeraisComponent } from './info-gerais/info-gerais.component';
import { InfoServicosComponent } from './info-servicos/info-servicos.component';
import { InfoLinhaComponent } from './info-linha/info-linha.component';
import { InfoRadiusComponent } from './info-radius/info-radius.component';
import { CadastroService } from '../cadastro.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { EventosMassivosComponent } from '../eventos-massivos/eventos-massivos.component';

@Component({
    selector: 'info-cadastro-list-component',
    templateUrl: 'info-cadastro-list.component.html',
    providers: [CadastroService]
})

export class InfoCadastroListComponent extends SuperComponentService implements OnInit {

    @Input() public cadastro: Cadastro;

    private count: number = 0;

    constructor(public holderService: HolderService,
        public navCtrl: NavController,
        private cadastroService: CadastroService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() { }

    public refreshCadastro() {
        if (this.holderService.isMock) {
            this.getCadastroMock("Reconsultando Cadastro Mock");
        } else {
            this.getCadastro("Reconsultando Cadastro");
        }
    }

    public getCadastro(mensagem: string) {
        let qntErro: number = 0;
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
                                                    this.holderService.btnFazFulltestAtivo = true;
                                                    super.validDSLAM(this.holderService.cadastro.rede, this.holderService.instancia);
                                                    this.ativo = false;
                                                    this.msgEventoMassivo();
                                                    this.loading(false);
                                                    super.showAlert("Sucesso.", "Reconsulta realizada com sucesso.");
                                                    clearInterval(rqSi);
                                                } else {
                                                    this.loading(false);
                                                    clearInterval(rqSi);
                                                    this.holderService.btnFazFulltestAtivo = false;
                                                }
                                            } else {
                                                this.loading(false);
                                                this.msgEventoMassivo();
                                                clearInterval(rqSi);
                                            }
                                        }
                                    }, error => {
                                        qntErro++;
                                        if (qntErro > 3) {
                                            this.loading(false);
                                            super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                                            clearInterval(rqSi);
                                        }
                                    });
                                if (this.count === this.holderService.rcount && !this.holderService.cadastro) {
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
        super.showAlert(super.makeexceptionmessageTitle("Tempo Excedido. Cod.10", false), super.makeexceptionmessage("Tempo de busca excedido por favor tente novamente. Para avaliação de manobra, ligar no CO", this.holderService.instancia));
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
            super.validDSLAM(this.holderService.cadastro.rede, this.holderService.instancia);
            this.ativo = false;
            this.msgEventoMassivo();
            this.loading(false);
            super.showAlert("Sucesso.", "Reconsulta realizada com sucesso.");


        }, 5000);
    }

    public validInstancia(): boolean {
        let valid: boolean = false;
        if (this.holderService.instancia && this.holderService.instancia.length === 10) {
            this.holderService.instancia = this.holderService.instancia.trim();
            valid = true;
        } else {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância ou verifique se a mesma está correta, o campo não pode estar vazio ou estar faltando digitos a instância consiste em 10 digitos contando o DDD + o número. Ex:4112345678.");
        }
        return valid;
    }

    public infoGerais() {
        this.navCtrl.push(InfoGeraisComponent);
    }

    public infoRede() {
        this.navCtrl.push(InfoRedeComponent);
    }

    public infoRedeExterna() {
        this.navCtrl.push(InfoRedeExternaComponent);
    }

    public infoServico() {
        this.navCtrl.push(InfoServicosComponent);
    }

    public infoLinha() {
        this.navCtrl.push(InfoLinhaComponent);
    }

    public infoRadius() {
        this.navCtrl.push(InfoRadiusComponent);
    }

    public msgEventoMassivo() {
        if (this.temEventoMassivo()) {
            super.showAlert("Evento Massivo", "Este cadastro possui um evento massivo, podendo ocorrer problemas nos testes e correções.");
        }
    }

    public entrarEventoMassivos() {
        this.navCtrl.push(EventosMassivosComponent);
    }

    public temEventoMassivo(): boolean {
        if (this.holderService.cadastro) {
            if (this.holderService.cadastro.eventos.length > 0) {
                return true;
            }
        }
        return false;
    }
}