import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CadastroComponent } from '../pages/cadastro/cadastro.component';
import { FulltestResultComponent } from '../pages/fulltest/fulltest-result/fulltest-result.component';
import { LoginComponent } from '../pages/login/login.component';
import { HolderService } from '../providers/holder/holder.service';
import { HomeComponent } from '../pages/home/home.component';
import { ManobraComponent } from '../pages/manobra/manobra.component';
// import { FulltestTVComponent } from '../pages/fulltest-tv/fulltest-tv.component';
import { ToolboxComponent } from '../pages/toolbox/toolbox.component';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	public home: any = HomeComponent;
	public cadastro: any = CadastroComponent;
	public fulltestResult: any = FulltestResultComponent;
	public login: any = LoginComponent;
	public manobra: any = ManobraComponent;
	public toolbox: any = ToolboxComponent;

	// public fulltestTv: any = FulltestTVComponent;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public holderService: HolderService) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
	}

}

