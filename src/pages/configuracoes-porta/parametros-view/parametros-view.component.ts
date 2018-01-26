import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { Valids } from '../../../view-model/fulltest/validacao';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';

@Component({
    selector: 'parametros-view-component',
    templateUrl: 'parametros-view.component.html'
})

export class ParametrosViewComponent extends ConfiguracoesPortaService implements OnInit {

    public valid: Valids;

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.valid = super.getParameterValid(this.holderService.certification.fulltest.valids, "Parâmetros");
    }

}