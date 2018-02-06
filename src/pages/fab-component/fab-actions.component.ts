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
        window.location.reload();
    }

    public novoAtendmento() {
        window.location.reload();
    }
}