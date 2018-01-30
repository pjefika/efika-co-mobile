import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { Valids } from '../../../view-model/fulltest/validacao';

@Component({
    selector: 'cadastro-component-confp',
    templateUrl: 'cadastro.component.html'
})

export class CadastroConfpComponent extends ConfiguracoesPortaService implements OnInit {

    public modulacao: Valids;
    public mac: Valids;
    

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.modulacao = super.getParameterValid(this.holderService.certification.fulltest.valids, "Modulação");
        this.mac = super.getParameterValid(this.holderService.certification.fulltest.valids, "MAC do Equipamento");
        
       
    }
}