import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroService } from './cadastro.service';
import { LoadingController } from 'ionic-angular';
import { HolderService } from '../../providers/holder/holder.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    providers: [CadastroService]
})

export class CadastroComponent implements OnInit {

    public ativo: boolean = false;
    public tipo: string;
    public titulo: string;
    public mensagem: string;

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
                this.ativo = false;
                this.holderService.cadastro = response;
            }, error => {
                this.ativo = true;
                this.tipo = "erro";
                this.titulo = "Ops, aconteceu algo.";
                this.mensagem = "Ocorreu um erro ao realizar a busca do cadastro, por favor verifique a instância.";
                console.log("Deu erro!!! OMG p(o.o)q");
            })
            .then(() => {
                //console.log(this.holderService.cadastro);
                carregando.dismiss();
            });
    }

    private resetHolder() {
        this.holderService.cadastro = null;
        this.holderService.objectValid = null;
    }
}