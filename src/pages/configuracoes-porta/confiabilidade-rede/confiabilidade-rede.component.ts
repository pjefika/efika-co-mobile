import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { Valids } from '../../../view-model/fulltest/validacao';

@Component({
    selector: 'confiabilidade-rede-component',
    templateUrl: 'confiabilidade-rede.component.html'
})

export class ConfiabilidadeRedeComponent extends ConfiguracoesPortaService implements OnInit {

    public valid: Valids;

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.valid = super.getParameterValid(this.holderService.certification.fulltest.valids, "Confiabilidade de Rede");
    }

}