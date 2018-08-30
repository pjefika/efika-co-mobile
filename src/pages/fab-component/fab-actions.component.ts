import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';

import { NavController } from 'ionic-angular';
import { UserModifyComponent } from '../login/user-modify/user-modify.component';
import { TestesRedeComponent } from '../../util/testes-rede/testes-rede.component';

@Component({
    selector: 'fab-action-component',
    templateUrl: 'fab-actions.component.html'
})

export class FabActionComponent implements OnInit {

    constructor(public holderService: HolderService,
        public navCtrl: NavController) { }

    public ngOnInit() { }

    public logout() {
        localStorage.clear();
        window.location.reload();
    }

    public novoAtendmento() {
        window.location.reload();
    }

    public userconfig() {
        this.navCtrl.push(UserModifyComponent, { comefromfast: true });
    }

    public testcase() {
        this.navCtrl.push(TestesRedeComponent);
    }

}