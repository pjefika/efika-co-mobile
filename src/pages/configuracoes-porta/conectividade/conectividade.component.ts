import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { Valids } from '../../../view-model/fulltest/validacao';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'conectividade-component',
    templateUrl: 'conectividade.component.html'
})

export class ConectividadeComponent extends ConfiguracoesPortaService implements OnInit {

    public parametros: Valids;
    public estadoPorta: Valids[];
    public assocOnt: Valids;
    public modulacao: Valids;

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.parametros = super.getParameterValid(this.holderService.certification.fulltest.valids, "Parâmetros", "Parâmetros Ópticos");
        this.estadoPorta = [super.getParameterValid(this.holderService.certification.fulltest.valids, "Estado Operacional da Porta")];
        this.estadoPorta.push(super.getParameterValid(this.holderService.certification.fulltest.valids, "Estado Administrativo da Porta"));
        this.assocOnt = super.getParameterValid(this.holderService.certification.fulltest.valids, "Associação Serial ONT");
        this.modulacao = super.getParameterValid(this.holderService.certification.fulltest.valids, "Modulação");
    }
}