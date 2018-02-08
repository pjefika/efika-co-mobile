import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { HeaderPopoverComponent } from '../../util/header-popover/header-popover.component';

@Component({
	selector: 'home-component',
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

	constructor(public navCtrl: NavController,
		public holderService: HolderService,
		public popoverController: PopoverController) { }

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