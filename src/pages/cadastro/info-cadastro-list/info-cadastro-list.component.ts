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
import { SuperComponentService } from '../../../providers/component-service/super-compoenent.service';
import { EventosMassivosComponent } from '../eventos-massivos/eventos-massivos.component';

@Component({
    selector: 'info-cadastro-list-component',
    templateUrl: 'info-cadastro-list.component.html',
    providers: [CadastroService]
})

export class InfoCadastroListComponent extends SuperComponentService implements OnInit {

    @Input() public cadastro: Cadastro;

    private count: number = 0;

    private carregando;

    constructor(public holderService: HolderService,
        public navCtrl: NavController,
        private cadastroService: CadastroService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public refreshCadastro() {
        if (this.holderService.isMock) {
            this.getCadastroMock();
        } else {
            this.getCadastro("Reconsultando Cadastro");
        }
    }

    public getCadastro(mensagem: string) {
        if (this.validInstancia()) {
            this.loading(true, mensagem);
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
                                            if (super.validState(resposta.output)) {
                                                if (super.validCustomer(resposta.output)) {
                                                    this.holderService.cadastro = resposta.output.customer;
                                                    this.holderService.tabCadastroAtivo = true;
                                                    this.validDSLAM();
                                                    this.ativo = false;
                                                    this.msgEventoMassivo();
                                                    this.loading(false);
                                                    super.showAlert("Sucesso.", "Reconsulta realizada com sucesso.");
                                                    clearInterval(rqSi);
                                                } else {
                                                    this.loading(false);
                                                    clearInterval(rqSi);
                                                    super.showAlert("Ops, aconteceu algo.", "Instância incorreta, a mesma não foi encontrada em nossas bases.");
                                                }
                                            } else {
                                                this.loading(false);
                                                this.msgEventoMassivo();
                                                clearInterval(rqSi);
                                            }
                                        }
                                    }, error => {
                                        this.loading(false);
                                        super.showAlert("Erro ao realizar busca de cadastro", error.mError);
                                        clearInterval(rqSi);
                                    });
                            } else {
                                this.loading(false);
                                super.showAlert("Ops, aconteceu algo.", "Tempo de busca excedido por favor tente novamente.");
                                clearInterval(rqSi);
                            }
                        }, this.holderService.rtimeout);
                    } else {
                        this.loading(false);
                        super.showAlert("Erro ao realizar busca de cadastro", response.exceptionMessage);
                    }                   
                }, error => {
                    this.loading(false);
                    super.showAlert("Ops, aconteceu algo.", error.mError);
                    console.log("Deu erro -- error --!!! AMD p(o.o)q");
                });
        }
    }

    public getCadastroMock() {
        super.showError(false);
        let carregando = this.loadingCtrl.create({ content: "Reconsultando Cadastro" });
        carregando.present();
        setTimeout(() => {
            this.holderService.cadastro = this.cadastroService.getCadastroMock();
            this.holderService.tabCadastroAtivo = true;
            this.msgEventoMassivo();
            carregando.dismiss();
        }, 300);
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

    private validDSLAM() {
        if (this.holderService.cadastro.rede.modeloDslam === "LIADSLPT48"
            || this.holderService.cadastro.rede.modeloDslam === "VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "VDPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE_SIP"
            || this.holderService.cadastro.rede.modeloDslam === "CCPE"
            || this.holderService.cadastro.rede.modeloDslam === "LI-VDSL24"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT"
            || this.holderService.cadastro.rede.modeloDslam === "NVLT-C_SIP") {
            super.showAlert("Atenção", "Modelo de DSLAM não implementado, não sendo possivel realizar o Fulltest, necessário contato com o Centro de Operações.");
        }
    }

    private loading(active: boolean, msg?: string, ) {
        if (active) {
            this.carregando = this.loadingCtrl.create({ content: msg });
            this.carregando.present();
        } else {
            this.carregando.dismiss();
        }
    }

}