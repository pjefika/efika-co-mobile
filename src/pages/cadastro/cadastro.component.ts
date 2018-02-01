import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController, NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';
import { HeaderPopoverComponent } from '../../util/header-popover/header-popover.component';
import { EventosMassivosComponent } from './eventos-massivos/eventos-massivos.component';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: []
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    public hideandshowsearch: boolean = true;

    public jaBuscou: boolean = false;

    constructor(public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public popoverController: PopoverController,
        public navCtrl: NavController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public openPopover() {
        let popover = this.popoverController.create(HeaderPopoverComponent);
        let ev = {
            target: {
                getBoundingClientRect: () => {
                    return {
                        top: '100',
                        left: '50'
                    };
                }
            }
        };
        popover.present({ ev });
    }

    public entrarEventoMassivos() {
        this.navCtrl.push(EventosMassivosComponent);
    }

    public temEventoMassivo(): boolean {
        if (this.holderService.cadastro) {
            if (this.holderService.cadastro.eventos.length > 0) {
                return true;
            }
        }
        return false;
    }
}