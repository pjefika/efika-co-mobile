import { Component, OnInit, Input } from '@angular/core';
import { Blocks } from '../../../../view-model/certification/blocks';
import { NavController } from 'ionic-angular';
import { ConectividadeComponent } from '../../../configuracoes-porta/conectividade/conectividade.component';
import { PerformanceComponent } from '../../../configuracoes-porta/performance/performance.component';
import { ServicosComponent } from '../../../configuracoes-porta/servicos/servicos.component';
import { CadastroConfpComponent } from '../../../configuracoes-porta/cadastro/cadastro.component';
import { HolderService } from '../../../../providers/holder/holder.service';
import { FulltestResultActionService } from '../fulltest-services/fulltest-result-action.service';

@Component({
    selector: 'blocks-certification-result-component',
    templateUrl: 'blocks-certification-result.component.html',
    providers: [FulltestResultActionService]
})

export class BlocksCertificationResultComponent implements OnInit {

    @Input() public blocks: Blocks[];

    constructor(public navCtrl: NavController,
        public holderService: HolderService,
        private fulltestResultActionService: FulltestResultActionService) { }

    public ngOnInit() {
        this.reorganizarBlocos();
    }

    /**
     * Organiza blocos
     * Mecher somente se mudar a estrutura da sequencia dos blocos.
     */
    public reorganizarBlocos() {
        this.blocks.sort(function (bloco1, bloco2) {
            if (bloco1.nome === "PERFORMANCE") {
                return 1;
            } else if (bloco1.nome < bloco2.nome && bloco1.nome != "PERFORMANCE") {
                return -1
            } else if (bloco1.nome > bloco2.nome && bloco1.nome != "PERFORMANCE") {
                return 1;
            } else {
                return 0;
            }
        });
    }

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

    public validaInfoInsideBlocks(info: string): boolean {
        return this.fulltestResultActionService.validaInfoInsideBlocks(info, this.holderService.certification.fulltest.valids);
    }

}