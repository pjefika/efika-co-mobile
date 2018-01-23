import { Component, OnInit, Input } from '@angular/core';
import { Certification } from '../../../../view-model/certification/certification';
import { HolderService } from '../../../../providers/holder/holder.service';

@Component({
    selector: 'info-gerais-fulltest-component',
    templateUrl: 'info-gerais-fulltest.component.html'
})

export class InfoGeraisFulltestComponent implements OnInit {

    public numero: string;
    public sequencia: string;

    @Input() public certification: Certification;

    constructor(public holderService: HolderService) { }

    public ngOnInit() { 
        this.numberValid();
    }

    public goToETA() {
        window.open("https://login.etadirect.com/gvt.etadirect.com", "_blank");
    }

    public numberValid() {
        // Informar se planta é VIVO1 ou VIVO2
        // Informar sequencia das opções da URA
        if (this.holderService.cadastro.rede.planta === "VIVO2") {
            this.numero = "08006009192";
            //this.sequencia = "1-3-5";
        } else {
            this.numero = "08006012032";
            //this.sequencia = "3-2-5";
        }

    }
}