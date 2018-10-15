import { Component, OnInit } from '@angular/core';
import { GlobalNotificationService } from './global-notification.service';
import { WebsocketService } from '../../providers/websocket-notification/websocket.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';

import { AlertController, LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'global-notification-component',
    templateUrl: 'global-notification.component.html',
    providers: [GlobalNotificationService, WebsocketService]
})

export class GlobalNotificationComponent extends SuperComponentService implements OnInit {

    constructor(private globalNotificationService: GlobalNotificationService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public holderService: HolderService) {
        super(alertCtrl, loadingCtrl, holderService);
        this.socket();
    }

    public ngOnInit() { }

    private socket() {
        this.globalNotificationService
            .messages
            .subscribe(msg => {
                super.showAlert("Mensagem", msg, false);
            });
    }

}