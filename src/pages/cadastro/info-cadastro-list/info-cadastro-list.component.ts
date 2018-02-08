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

    constructor(public holderService: HolderService,
        public navCtrl: NavController,
        private cadastroService: CadastroService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public refreshCadastro() {
        // --Mock
        // this.getCadastroMock();
        // --Prod
        this.getCadastro();
    }

    public getCadastro() {
        if (this.holderService.instancia) {
            let carregando = this.loadingCtrl.create({ content: "Reconsultando Cadastro" });
            carregando.present();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    if (super.validState(response.output)) {
                        this.holderService.cadastro = response.output.customer;
                        this.holderService.tabCadastroAtivo = true;
                        this.msgEventoMassivo();
                    }
                }, error => {
                    super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
                    console.log("Deu erro -- error --!!! AMD p(o.o)q");
                    this.holderService.tabCadastroAtivo = false;
                })
                .then(() => {
                    carregando.dismiss();
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