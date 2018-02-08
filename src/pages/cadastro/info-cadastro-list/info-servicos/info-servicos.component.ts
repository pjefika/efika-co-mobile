import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../../providers/holder/holder.service';
import { Servicos } from '../../../../view-model/cadastro/servicos';

@Component({
    selector: 'info-servicos-component',
    templateUrl: 'info-servicos.component.html'
})

export class InfoServicosComponent implements OnInit {

    public servicos: Servicos;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.servicos = this.holderService.cadastro.servicos
    }

}