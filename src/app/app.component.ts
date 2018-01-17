import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CadastroComponent } from '../pages/cadastro/cadastro.component';
import { FulltestResultComponent } from '../pages/fulltest/fulltest-result/fulltest-result.component';
import { LoginComponent } from '../pages/login/login.component';
import { HolderService } from '../providers/holder/holder.service';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	public cadastro: any = CadastroComponent;
	public fulltestResult: any = FulltestResultComponent
	public login: any = LoginComponent;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public holderService: HolderService) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

	public goToOtherTab() {
		
	}

}

