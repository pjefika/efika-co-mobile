import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holderService';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	constructor(public navCtrl: NavController,
		public holderService: HolderService) { }

	public ngOnInit() { }

}