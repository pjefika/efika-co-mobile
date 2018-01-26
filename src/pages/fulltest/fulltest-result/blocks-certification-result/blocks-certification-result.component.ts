import { Component, OnInit, Input } from '@angular/core';
import { Blocks } from '../../../../view-model/certification/blocks';
import { NavController } from 'ionic-angular';
import { ParametrosViewComponent } from '../../../configuracoes-porta/parametros-view/parametros-view.component';
import { ConfiabilidadeRedeComponent } from '../../../configuracoes-porta/confiabilidade-rede/confiabilidade-rede.component';

@Component({
    selector: 'blocks-certification-result-component',
    templateUrl: 'blocks-certification-result.component.html'
})

export class BlocksCertificationResultComponent implements OnInit {

    @Input() public blocks: Blocks[];

    constructor(public navCtrl: NavController) { }

    public ngOnInit() { }

    public openInfos(info: string) {

        switch (info) {
            case "CONECTIVIDADE":
                this.navCtrl.push(ParametrosViewComponent);
                break;
            case "PERFORMANCE":
            this.navCtrl.push(ConfiabilidadeRedeComponent);
                break;
            case "SERVICOS":

                break;
            case "CADASTRO":

                break;
        }
    }
}