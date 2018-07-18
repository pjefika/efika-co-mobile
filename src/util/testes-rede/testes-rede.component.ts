import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';

import { LoadingController, AlertController } from 'ionic-angular';

@Component({
    selector: 'testes-rede-component',
    templateUrl: 'testes-rede.component.html'
})

export class TestesRedeComponent extends SuperComponentService implements OnInit {

    public linkyoutube: string = "https://www.youtube.com/watch?v=mtIp-_FYn7A";
    public linknetflix: string = "https://fast.com/pt/#";


    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() { }

    public dotestyoutube() {
        this.openLink(this.linkyoutube);
    }

    public dotestnetflix() {
        this.openLink(this.linknetflix);
    }

    public openLink(link: string) {
        window.open(link);
    }

}