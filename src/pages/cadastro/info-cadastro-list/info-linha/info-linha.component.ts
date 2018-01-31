import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../../providers/holder/holder.service';
import { Linha } from '../../../../view-model/cadastro/linha';

@Component({
    selector: 'info-linha-component',
    templateUrl: 'info-linha.component.html'
})

export class InfoLinhaComponent implements OnInit {

    public linha: Linha;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.linha = this.holderService.cadastro.linha;
    }
}