import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CadastroService } from './cadastro.service';
import { LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';
import { SuperComponentService } from '../../providers/component-service/super-compoenent.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: [CadastroService]
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    constructor(private cadastroService: CadastroService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl);
    }

    public ngOnInit() { }

    public getCadastro() {
        if (!this.holderService.instancia) {
            super.showError(true, "cuidado", "Alerta", "Por favor preencha a instância, o campo não pode estar vazio.");
        } else {
            this.resetHolder();
            let carregando = this.loadingCtrl.create({ content: "Consultando Cadastro" });
            carregando.present();
            this.cadastroService
                .getCadastro(this.holderService.instancia)
                .then(response => {
                    super.showError(false);
                    this.holderService.cadastro = response.output.customer;
                }, error => {
                    super.showError(true, "erro", "Ops, aconteceu algo.", "Ocorreu um erro ao realizar a busca do cadastro, por favor verifique a instância.");
                    console.log("Deu erro!!! OMG p(o.o)q");
                })
                .then(() => {
                    //console.log(this.holderService.cadastro);
                    carregando.dismiss();
                });
        }
    }

    private resetHolder() {
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
    }
}