import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { HeaderPopoverComponent } from '../../util/header-popover/header-popover.component';
import { SuperComponentService } from '../../providers/component-service/super-component.service';

@Component({
	selector: 'home-component',
	templateUrl: 'home.component.html'
})
export class HomeComponent extends SuperComponentService implements OnInit {

	constructor(public navCtrl: NavController,
		public holderService: HolderService,
		public popoverController: PopoverController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController) {
		super(alertCtrl, loadingCtrl, holderService);
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

}