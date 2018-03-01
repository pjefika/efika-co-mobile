import { Component, OnInit } from '@angular/core';
import { Ont } from '../../../../view-model/task-process/ont';
import { OntsLivresService } from './onts-livres.service';
import { HolderService } from '../../../../providers/holder/holder.service';
import { SuperConfPortaService } from '../../service-configuracoes-porta/super-conf-porta.service';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { Valids } from '../../../../view-model/fulltest/validacao';

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
        this.getOntsDisp();
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
                    this.navCtrl.pop();
                }
            }, error => {
                // error.mError
                super.showError(true, "erro", "Ops, aconteceu algo.", error.mError);
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
                // Verificar Retorno... 1.2.3
                let idx: number = this.holderService.certification.fulltest.valids.map(function (e) { return e.nome; }).indexOf("Associação Serial ONT");
                let setValidOnt: Valids;
                setValidOnt = {
                    foiCorrigido: true,
                    mensagem: "Identificado ONT associada: " + response.output.serial.serial,
                    nome: "Associação Serial ONT",
                    resultado: true,
                    result: {
                        nome: "Associação Serial ONT",
                        type: "--",
                        slot: this.holderService.cadastro.rede.slot,
                        porta: this.holderService.cadastro.rede.porta
                    }
                }
                this.holderService.certification.fulltest.valids[idx] = setValidOnt;
                super.showAlert("ONT", "ONT Associada com sucesso, realize o Fulltest novamente.");
            }, error => {
                super.showAlert("Erro", error.mError);
            })
            .then(() => {
                carregando.dismiss();
                this.navCtrl.pop();
            });
    }

    /**
     * 
     * @param ont Retorna verdadeiro ou falso para habilitar botão de associar de acordo com sua respectivo slot e porta.
     */
    public btnAssocDisable(ont: Ont): boolean {
        // console.log("Porta fO: " + ont.porta);
        // console.log("Slot fO: " + ont.slot);

        // console.log("Porta fH" + this.holderService.cadastro.rede.porta);
        // console.log("Slot fH" + this.holderService.cadastro.rede.slot);
        let valid: boolean = false;
        if (ont.slot === this.holderService.cadastro.rede.slot && ont.porta === this.holderService.cadastro.rede.porta) {
            valid = true;
        }
        return valid;
    }


}