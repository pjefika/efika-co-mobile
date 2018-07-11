import { Component, OnInit } from '@angular/core';
import { Rede } from '../../../../view-model/cadastro/rede';
import { HolderService } from '../../../../providers/holder/holder.service';

@Component({
    selector: 'info-rede-component',
    templateUrl: 'info-rede.component.html'
})

export class InfoRedeComponent implements OnInit {

    public btnMostrarMaisMenos: boolean = false;
    public btnMostrarMaisMenosName: string = "Mostrar Mais";

    public rede: Rede;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.rede = this.holderService.cadastro.rede;
    }

    public actMostrarMaisMenos() {
        if (this.btnMostrarMaisMenos) {
            this.btnMostrarMaisMenos = false;
            this.btnMostrarMaisMenosName = "Mostrar Mais";
        } else {
            this.btnMostrarMaisMenos = true;
            this.btnMostrarMaisMenosName = "Mostrar Menos";
        }
    }

}