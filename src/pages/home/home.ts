import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	constructor(public navCtrl: NavController,
		public holderService: HolderService) { }

	public ngOnInit() { }

}