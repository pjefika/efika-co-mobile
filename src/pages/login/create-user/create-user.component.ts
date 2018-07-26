import { Component, OnInit } from '@angular/core';
import { CreateUserService } from './create-user.service';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { LoadingController, AlertController } from 'ionic-angular';
import { NavController, ViewController } from 'ionic-angular';
import { UsuarioCreate } from '../../../view-model/usuario/usuario_create';

@Component({
    selector: 'create-user-component',
    templateUrl: 'create-user.component.html',
    providers: [CreateUserService]
})

export class CreateUserComponent extends SuperComponentService implements OnInit {

    public lclusters: string[];
    public lcidades: string[];

    public usuarioCreate = new UsuarioCreate();

    constructor(private createUserService: CreateUserService,
        public holderService: HolderService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public navCtrl: NavController,
        public viewCtrl: ViewController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.getcluster();
        // this.presetinfos();
    }

    public getcluster() {
        this.createUserService
            .getcluster()
            .then(resposta => {
                this.lclusters = resposta;
            }, error => {
                super.showAlert(error.tError, error.mError);
            });
    }

    public getcidadeesp() {
        super.loading(true, "Consultando cidades");
        this.createUserService
            .getcidadeespcluster(this.usuarioCreate.cluster)
            .then(resposta => {
                this.lcidades = resposta;
            }, error => {
                super.showAlert(error.tError, error.mError);
            })
            .then(() => {
                super.loading(false);
            })
    }

    public pediracesso() {
        super.loading(true, "Estamos salvando seus dados, por favor aguarde.");
        if (this.validinfos()) {
            this.createUserService
                .pediracesso(this.usuarioCreate)
                .then(resposta => {
                    if (resposta) {
                        super.loading(false);
                        super.showAlert("Sucesso", "Acesso solicitado com sucesso, aguarde enquanto nossa equipe processa os dados.");
                        this.viewCtrl.dismiss();
                    }
                }, error => {
                    super.loading(false);
                    super.showAlert(error.tError, error.mError);
                });
        }
    }

    public validinfos(): boolean {
        let valid: boolean = false;
        if (this.usuarioCreate.nome &&
            this.usuarioCreate.matricula &&
            this.usuarioCreate.email &&
            this.usuarioCreate.cpf &&
            this.usuarioCreate.contato &&
            this.usuarioCreate.cluster &&
            this.usuarioCreate.cidade) {
            valid = true;
        } else {
            super.showAlert("Campos incompletos", "Por favor preencha todos os campos para solicitar o acesso.");
        }
        return valid;
    }

    public presetinfos() {
        this.usuarioCreate = {
            nome: "Fabio Clem",
            matricula: "G0034481",
            email: "fabioh.silva@telefonica.com",
            cpf: "08110367909",
            contato: "041992557131",
            cluster: "",
            cidade: ""
        }
    }


}