import { Component, OnInit, Input } from '@angular/core';
import { Blocks } from '../../../../view-model/certification/blocks';
import { NavController } from 'ionic-angular';
import { ConectividadeComponent } from '../../../configuracoes-porta/conectividade/conectividade.component';
import { PerformanceComponent } from '../../../configuracoes-porta/performance/performance.component';
import { ServicosComponent } from '../../../configuracoes-porta/servicos/servicos.component';
import { CadastroConfpComponent } from '../../../configuracoes-porta/cadastro/cadastro.component';

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
                //Parametros
                this.navCtrl.push(ConectividadeComponent);
                break;
            case "PERFORMANCE":
                //Confiabilidade de Rede
                this.navCtrl.push(PerformanceComponent);
                break;
            case "SERVICOS":
                //Vlan Banda
                //Profile
                this.navCtrl.push(ServicosComponent);
                break;
            case "CADASTRO":
                //Modulação                
                //MAC do Equipamento
                this.navCtrl.push(CadastroConfpComponent);
                break;
        }
    }
}