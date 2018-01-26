import { Component, OnInit, Input } from '@angular/core';
import { Blocks } from '../../../../view-model/certification/blocks';
import { NavController } from 'ionic-angular';
import { ParametrosViewComponent } from '../../../configuracoes-porta/parametros-view/parametros-view.component';

@Component({
    selector: 'blocks-certification-result-component',
    templateUrl: 'blocks-certification-result.component.html'
})

export class BlocksCertificationResultComponent implements OnInit {

    @Input() public blocks: Blocks[];

    constructor(public navCtrl: NavController) { }

    public ngOnInit() { }

    public openInfos(info: string) {

        if (info === "CONECTIVIDADE") {
            this.navCtrl.push(ParametrosViewComponent);
        }

    }
}