import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'cadastro-component-confp',
    templateUrl: 'cadastro.component.html'
})

export class CadastroConfpComponent extends ConfiguracoesPortaService implements OnInit {

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {

    }

    ionViewWillLeave() {
        this.holderService.showhidetab = true;
    }
}