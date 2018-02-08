import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../../../../view-model/cadastro/cadastro';
import { HolderService } from '../../../../providers/holder/holder.service';

@Component({
    selector: 'info-gerais-component',
    templateUrl: 'info-gerais.component.html'
})

export class InfoGeraisComponent implements OnInit {

    public cadastro: Cadastro;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.cadastro = this.holderService.cadastro;
    }

}