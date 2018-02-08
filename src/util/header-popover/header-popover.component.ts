import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'header-popover-component',
    templateUrl: 'header-popover.component.html'
})

export class HeaderPopoverComponent implements OnInit {

    constructor(public holderService: HolderService,
        public viewCtrl: ViewController) { }

    public ngOnInit() { }

    public logout() {
        sessionStorage.clear();
        this.resetHolder();
        this.viewCtrl.dismiss();
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