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
import { UrlService } from '../providers/url-service/url.service';
import { FulltestComponent } from '../pages/fulltest/fulltest.component';
import { CadastroComponent } from '../pages/cadastro/cadastro.component';
import { InfoCadastroComponent } from '../pages/cadastro/info-cadastro/info-cadastro.component';
import { DynamicComponent } from '../pages/dynamiccomponent/dynamic.component';
import { DynamicRouterComponent } from '../pages/dynamiccomponent/dynamic-router/dynamic-router.component';
import { DynamicRouterHolderService } from '../pages/dynamiccomponent/dynamic-router/dynamic-router-holder.service';
import { FulltestResultComponent } from '../pages/fulltest/fulltest-result/fulltest-result.component';
import { MomentModule } from 'angular2-moment';
import { LoginComponent } from '../pages/login/login.component';
import { HolderService } from '../providers/holder/holder.service';
import { AlertMensagemComponent } from '../util/alert-mensagem/alert-mensagem.component';
import { SuperComponentService } from '../providers/component-service/super-compoenent.service';
import { BlocksCertificationResultComponent } from '../pages/fulltest/fulltest-result/blocks-certification-result/blocks-certification-result.component';
import { InfoGeraisFulltestComponent } from '../pages/fulltest/fulltest-result/info-gerais-fulltest/info-gerais-fulltest.component';
import { HeaderPopoverComponent } from '../util/header-popover/header-popover.component';
import { LoginUtilService } from '../util/login-util/login-util.service';

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
		LoginComponent,
		AlertMensagemComponent,
		BlocksCertificationResultComponent,
		InfoGeraisFulltestComponent,
		HeaderPopoverComponent
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
		LoginComponent,
		AlertMensagemComponent,
		BlocksCertificationResultComponent,
		InfoGeraisFulltestComponent,
		HeaderPopoverComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HolderService,
		UrlService,
		DynamicRouterHolderService,
		SuperComponentService,
		LoginUtilService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
