import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holderService';
import { DynamicRouterHolderService } from '../dynamiccomponent/dynamic-router/dynamic-router-holder.service';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {

	constructor(public navCtrl: NavController,
		public holderService: HolderService,
		public dynamicRouterHolderService: DynamicRouterHolderService) {

	}

	public ngOnInit() {
		this.setToDynamicComponent(CadastroComponent);
	}

	public setToDynamicComponent(component: any) {
		// Sempre resetar para null antes de setar component
		this.dynamicRouterHolderService.component = null;
		// Deixar timeout senão react não entende que mudou variavel na holder.
		setTimeout(() => {
			this.dynamicRouterHolderService.component = component;
		}, 1);
	}

}