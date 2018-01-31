import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { Cadastro } from '../../../view-model/cadastro/cadastro';

import { NavController } from 'ionic-angular';
import { InfoRedeComponent } from './info-rede/info-rede.component';
import { InfoRedeExternaComponent } from './info-rede-externa/info-rede-externa.component';
import { InfoGeraisComponent } from './info-gerais/info-gerais.component';
import { InfoServicosComponent } from './info-servicos/info-servicos.component';
import { InfoLinhaComponent } from './info-linha/info-linha.component';

@Component({
    selector: 'info-cadastro-list-component',
    templateUrl: 'info-cadastro-list.component.html'
})

export class InfoCadastroListComponent implements OnInit {

    @Input() public cadastro: Cadastro;

    constructor(public holderService: HolderService,
        public navCtrl: NavController) { }

    public ngOnInit() { }

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

}