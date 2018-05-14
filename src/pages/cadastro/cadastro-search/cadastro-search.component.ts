import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { CadastroService } from '../cadastro.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { SuperComponentService } from '../../../providers/component-service/super-compoenent.service';

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
        super(alertCtrl);
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
        super.showError(false);
        if (this.validInstancia()) {
            let carregando = this.loadingCtrl.create({ content: mensagem });
            carregando.present();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    if (response) {
                        let rqSi = setInterval(() => {
                            if (this.count < 9) {
                                this.count++;
                                this.cadastroService
                                    .gettask(response.id)
                                    .then(resposta => {
                                        if (resposta.state === "EXECUTED") {
                                            if (super.validState(resposta.output)) {
                                                if (super.validCustomer(resposta.output)) {
                                                    this.holderService.cadastro = resposta.output.customer;
                                                    this.holderService.tabCadastroAtivo = true;
                                                    setTimeout(() => {
                                                        this.navCtrl.parent.select(1);
                                                    }, 1);
                                                    this.ativo = false;
                                                    carregando.dismiss();
                                                    this.msgEventoMassivo();
                                                    this.jaBuscou = true;
                                                    clearInterval(rqSi);
                                                } else {
                                                    carregando.dismiss();
                                                    clearInterval(rqSi);
                                                    super.showError(true, "erro", "Ops, aconteceu algo.", "Instância incorreta, a mesma não foi encontrada em nossas bases.");
                                                }
                                            } else {
                                                carregando.dismiss();
                                                this.msgEventoMassivo();
                                                this.jaBuscou = true;
                                                clearInterval(rqSi);
                                            }
                                        }
                                    }, error => {
                                        carregando.dismiss();
                                        clearInterval(rqSi);
                                    });
                            } else {
                                carregando.dismiss();
                                clearInterval(rqSi);
                                this.jaBuscou = true;
                            }
                        }, 15000);
                    } else {
                        super.showError(true, "erro", "Erro ao realizar busca de cadastro", response.exceptionMessage);
                    }
                }, error => {
                    super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
                    console.log("Deu erro -- error --!!! AMD p(o.o)q");
                });
        }
    }

    public getCadastroMock(mensagem: string) {
        super.showError(false);
        // if (this.validInstancia()) {
        let carregando = this.loadingCtrl.create({ content: mensagem });
        carregando.present();
        setTimeout(() => {
            carregando.dismiss();
            this.holderService.cadastro = this.cadastroService.getCadastroMock();
            this.holderService.tabCadastroAtivo = true;
            this.msgEventoMassivo();
            setTimeout(() => {
                this.navCtrl.parent.select(1);
            }, 1);
        }, 300);
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
        if (this.holderService.instancia && this.holderService.instancia.length === 10) {
            this.holderService.instancia = this.holderService.instancia.trim();
            valid = true;
        } else {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância ou verifique se a mesma está correta, o campo não pode estar vazio ou estar faltando digitos a instância consiste em 10 digitos contando o DDD + o número. Ex:4112345678.");
        }
        return valid;
    }

}