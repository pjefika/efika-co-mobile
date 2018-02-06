import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController, NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';
import { HeaderPopoverComponent } from '../../util/header-popover/header-popover.component';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html'
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public popoverController: PopoverController,
        public navCtrl: NavController) {
        super(alertCtrl);
    }

    public ngOnInit() {
        this.holderService.tabHomeAtivo = false;
    }

    public openPopover() {
        let popover = this.popoverController.create(HeaderPopoverComponent);
        let ev = {
            target: {
                getBoundingClientRect: () => {
                    return {
                        top: '100',
                        left: '50',
                        height: '30'
                    };
                }
            }
        };
        popover.present({ ev });
    }
}