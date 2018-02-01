import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, PopoverController, NavController } from 'ionic-angular';
import { CadastroService } from './cadastro.service';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';
import { HeaderPopoverComponent } from '../../util/header-popover/header-popover.component';
import { EventosMassivosComponent } from './eventos-massivos/eventos-massivos.component';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: [CadastroService]
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    public hideandshowsearch: boolean = true;

    public jaBuscou: boolean = false;

    constructor(private cadastroService: CadastroService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public popoverController: PopoverController,
        public navCtrl: NavController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public searchInputOptions(what: boolean) {
        if (this.holderService.instancia) {
            if (this.holderService.cadastro) {
                if (what) {
                    this.hideandshowsearch = true;
                } else {
                    this.hideandshowsearch = false;
                }
            }
        }
    }

    //Busca cadastro.
    public getCadastro() {
        this.resetHolder();
        // this.buscaCadastro("Consultando Cadastro");
        this.getCadastroMock("Consultando Cadastro");
    }

    //Reconsulta de cadastro.
    public reconsultar() {
        // this.buscaCadastro("Reconsultando Cadastro");
        this.getCadastroMock("Reconsultando Cadastro");
    }

    public buscaCadastro(mensagem: string) {
        if (!this.holderService.instancia) {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância, o campo não pode estar vazio.");
        } else {
            let carregando = this.loadingCtrl.create({ content: mensagem });
            carregando.present();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    if (super.validState(response.output)) {
                        super.showError(false);
                        this.holderService.cadastro = response.output.customer;
                    }
                }, error => {
                    super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
                    console.log("Deu erro -- error --!!! AMD p(o.o)q");
                })
                .then(() => {
                    carregando.dismiss();
                    this.msgEventoMassivo();
                    this.jaBuscou = true;
                });
        }
    }

    public getCadastroMock(mensagem: string) {
        this.resetHolder();
        let carregando = this.loadingCtrl.create({ content: mensagem });
        carregando.present();
        setTimeout(() => {
            carregando.dismiss();
            this.holderService.cadastro = this.cadastroService.getCadastroMock();
            this.msgEventoMassivo();
        }, 300);
    }

    private resetHolder() {
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
    }

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

    public entrarEventoMassivos() {
        this.navCtrl.push(EventosMassivosComponent);
    }


    public msgEventoMassivo() {
        if (this.haveEventoMassivo()) {
            super.showAlert("Evento Massivo", "Este cadastro possui um evento massivo, podendo ocorrer problemas nos testes e correções.");
        }
    }

    public haveEventoMassivo(): boolean {
        if (this.holderService.cadastro) {
            if (this.holderService.cadastro.eventos.length > 0) {
                return true;
            }
        }
        return false;
    }
}