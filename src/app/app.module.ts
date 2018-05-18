import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ObjKeysPipe } from '../util/pipes/objKeysPipe';
import { Capitalize, KeyBeautifyingPipe } from '../util/pipes/beautifyingPipe';
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
import { EstadoPortaComponent } from '../pages/configuracoes-porta/estado-porta/estado-porta.component';
import { InfoCadastroListComponent } from '../pages/cadastro/info-cadastro-list/info-cadastro-list.component';
import { InfoRedeComponent } from '../pages/cadastro/info-cadastro-list/info-rede/info-rede.component';
import { InfoRedeExternaComponent } from '../pages/cadastro/info-cadastro-list/info-rede-externa/info-rede-externa.component';
import { InfoGeraisComponent } from '../pages/cadastro/info-cadastro-list/info-gerais/info-gerais.component';
import { InfoServicosComponent } from '../pages/cadastro/info-cadastro-list/info-servicos/info-servicos.component';
import { InfoLinhaComponent } from '../pages/cadastro/info-cadastro-list/info-linha/info-linha.component';
import { InfoRadiusComponent } from '../pages/cadastro/info-cadastro-list/info-radius/info-radius.component';
import { HomeComponent } from '../pages/home/home.component';
import { CadastroSearchComponent } from '../pages/cadastro/cadastro-search/cadastro-search.component';
import { InfoMuralComponent } from '../pages/home/info-mural/info-mural.component';
import { OntsLivrsComponent } from '../pages/configuracoes-porta/associacaoont/onts-livres/onts-livres.component';
import { FabActionComponent } from '../pages/fab-component/fab-actions.component';
import { UrlService } from '../providers/new_url-service/url.service';
import { LinkService } from '../providers/new_url-service/link.service';
import { VersionComponent } from '../util/version/version.component';

@NgModule({
	declarations: [
		MyApp,
		HomeComponent,
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
		AssociacaoOntComponent,
		EstadoPortaComponent,
		InfoCadastroListComponent,
		InfoRedeComponent,
		InfoRedeExternaComponent,
		InfoGeraisComponent,
		InfoServicosComponent,
		InfoLinhaComponent,
		InfoRadiusComponent,
		CadastroSearchComponent,
		InfoMuralComponent,
		OntsLivrsComponent,
		FabActionComponent,
		VersionComponent
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
		HomeComponent,
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
		AssociacaoOntComponent,
		EstadoPortaComponent,
		InfoCadastroListComponent,
		InfoRedeComponent,
		InfoRedeExternaComponent,
		InfoGeraisComponent,
		InfoServicosComponent,
		InfoLinhaComponent,
		InfoRadiusComponent,
		CadastroSearchComponent,
		InfoMuralComponent,
		OntsLivrsComponent,
		VersionComponent
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HolderService,
		UrlService,
		LinkService,
		SuperComponentService,
		LoginUtilService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
