import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { ObjKeysPipe } from '../util/pipes/objKeysPipe';
import { Capitalize, KeyBeautifyingPipe } from '../util/pipes/beautifyingPipe';
import { HolderService } from '../providers/holder/holderService';
import { UrlService } from '../providers/url-service/url.service';
import { FulltestComponent } from '../pages/fulltest/fulltest.component';
import { CadastroComponent } from '../pages/cadastro/cadastro.component';
import { InfoCadastroComponent } from '../pages/cadastro/info-cadastro/info-cadastro.component';
import { DynamicComponent } from '../pages/dynamiccomponent/dynamic.component';
import { DynamicRouterComponent } from '../pages/dynamiccomponent/dynamic-router/dynamic-router.component';
import { DynamicRouterHolderService } from '../pages/dynamiccomponent/dynamic-router/dynamic-router-holder.service';
import { FulltestResultComponent } from '../pages/fulltest/fulltest-result/fulltest-result.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ObjKeysPipe,
		KeyBeautifyingPipe,
		Capitalize,
		FulltestComponent,
		CadastroComponent,
		InfoCadastroComponent,
		DynamicComponent,
		DynamicRouterComponent,
		FulltestResultComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		MomentModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		CadastroComponent,
		InfoCadastroComponent,
		FulltestComponent,
		FulltestResultComponent,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HolderService,
		UrlService,
		DynamicRouterHolderService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
