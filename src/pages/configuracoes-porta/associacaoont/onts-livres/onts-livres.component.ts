import { Component, OnInit } from '@angular/core';
import { Ont } from '../../../../view-model/task-process/ont';
import { OntsLivresService } from './onts-livres.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { SuperConfPortaService } from '../../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';

@Component({
    selector: 'onts-livres-component',
    templateUrl: 'onts-livres.component.html',
    providers: [OntsLivresService]
})

export class OntsLivrsComponent extends SuperConfPortaService implements OnInit {

    public onts: Ont[];

    constructor(private ontsLivresService: OntsLivresService,
        public holderService: HolderService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navCtrl: NavController) {
        super(alertCtrl);
    }

    public ngOnInit() {
        if (this.holderService.onts) {
            this.onts = this.holderService.onts;
        } else {
            this.getOntsDisp();
        }
    }

    private getOntsDisp() {
        let carregando = this.loadingCtrl.create({ content: "Aguarde, carregando ONT's..." });
        carregando.present();
        this.ontsLivresService
            .getOntsDisp(this.holderService.instancia)
            .then(response => {
                if (response.output.onts) {
                    this.onts = response.output.onts;
                    super.showAlert("ONT's", "Busca realizada com sucesso.");
                } else {
                    super.showAlert("ONT's", "Não foram encontradas ONT's disponiveis");
                }
            }, error => {
                super.showError(true, "cuidado", "Ops, aconteceu algo", error.mError);
            })
            .then(() => {
                carregando.dismiss();
            });
    }

    public setOnt(ont: Ont) {
        let carregando = this.loadingCtrl.create({ content: "Aguarde, associando ONT..." });
        carregando.present();
        this.ontsLivresService
            .setOntsDisp(ont.serial, this.holderService.cadastro)
            .then(response => {
                super.showAlert("ONT", "ONT Associada com sucesso");
            }, error => {
                super.showAlert("Ops, aconteceu algo", error.mError);
            })
            .then(() => {
                carregando.dismiss();
                this.navCtrl.pop();
            });
    }

    public btnAssocDisable(ont: Ont): boolean {
        let valid: boolean = true;
        if (ont.slot === this.holderService.cadastro.rede.slot && ont.porta === this.holderService.cadastro.rede.porta) {
            valid = false;
        }
        return valid;
    }


}