import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroService } from './cadastro.service';
import { HolderService } from '../../providers/holder/holderService';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: [CadastroService]
})

export class CadastroComponent implements OnInit {

    constructor(public navCtrl: NavController,
        private cadastroService: CadastroService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController) { }

    public ngOnInit() { }

    public getCadastro() {
        this.resetHolder();
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;

        let carregando = this.loadingCtrl.create({
            content: "Consultando Cadastro"
        });
        carregando.present();
        this.cadastroService
            .getCadastro(this.holderService.instancia)
            .then(response => {
                this.holderService.cadastro = response;
            }, error => {
                console.log("Deu erro!!! OMG p(o.o)q");
            })
            .then(() => {
                console.log(this.holderService.cadastro);
                carregando.dismiss();
            });
    }


    private resetHolder() {        
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
    }
}