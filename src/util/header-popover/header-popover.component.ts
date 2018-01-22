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
        this.holderService.estalogado = false;
        this.viewCtrl.dismiss();
    }

}