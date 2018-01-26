import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { Valids } from '../../../view-model/fulltest/validacao';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'performance-component',
    templateUrl: 'performance.component.html'
})

export class PerformanceComponent extends ConfiguracoesPortaService implements OnInit {

    public confbRede: Valids;

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.confbRede = super.getParameterValid(this.holderService.certification.fulltest.valids, "Confiabilidade de Rede");
    }
}