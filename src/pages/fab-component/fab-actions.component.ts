import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'fab-action-component',
    templateUrl: 'fab-actions.component.html'
})

export class FabActionComponent implements OnInit {

    constructor(public holderService: HolderService) { }

    public ngOnInit() { }

    public logout() {
        sessionStorage.clear();
        this.resetHolder();
    }

    public novoAtendmento() {
        window.location.reload();
    }

    private resetHolder() {
        this.holderService.instancia = null;
        this.holderService.estalogado = false;
        this.holderService.cadastro = null;
        this.holderService.certification = null;
    }
}