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
import { EventosMassivosComponent } from '../pages/cadastro/eventos-massivos/eventos-massivos.component';
import { FocuserDirective } from '../providers/directive/focuser.directive';
import { ParametrosViewComponent } from '../pages/configuracoes-porta/parametros-view/parametros-view.component';
import { ConfiabilidadeRedeComponent } from '../pages/configuracoes-porta/confiabilidade-rede/confiabilidade-rede.component';
import { ConectividadeComponent } from '../pages/configuracoes-porta/conectividade/conectividade.component';
import { PerformanceComponent } from '../pages/configuracoes-porta/performance/performance.component';
import { ServicosComponent } from '../pages/configuracoes-porta/servicos/servicos.component';
import { ProfileComponent } from '../pages/configuracoes-porta/profile/profile.component';
import { VlanComponent } from '../pages/configuracoes-porta/vlanbanda/vlan.component';
import { ModulacaoComponent } from '../pages/configuracoes-porta/modulacao/modulacao.component';
import { CadastroConfpComponent } from '../pages/configuracoes-porta/cadastro/cadastro.component';
import { MacComponent } from '../pages/configuracoes-porta/mac/mac.component';
import { AssociacaoOntComponent } from '../pages/configuracoes-porta/associacaoont/associacao-ont.component';

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
		FulltestResultComponent,
		LoginComponent,
		AlertMensagemComponent,
		BlocksCertificationResultComponent,
		InfoGeraisFulltestComponent,
		HeaderPopoverComponent,
		EventosMassivosComponent,
		FocuserDirective,
		ConectividadeComponent,
		PerformanceComponent,
		ParametrosViewComponent,
		ConfiabilidadeRedeComponent,
		ServicosComponent,
		ProfileComponent,
		VlanComponent,
		CadastroConfpComponent,
		ModulacaoComponent,
		MacComponent,
		AssociacaoOntComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp, {
			scrollAssist: true,
			autoFocusAssist: true
		}),
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
		HeaderPopoverComponent,
		EventosMassivosComponent,
		ConectividadeComponent,
		PerformanceComponent,
		ParametrosViewComponent,
		ConfiabilidadeRedeComponent,
		ServicosComponent,
		ProfileComponent,
		VlanComponent,
		CadastroConfpComponent,
		ModulacaoComponent,
		MacComponent,
		AssociacaoOntComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HolderService,
		UrlService,
		SuperComponentService,
		LoginUtilService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
