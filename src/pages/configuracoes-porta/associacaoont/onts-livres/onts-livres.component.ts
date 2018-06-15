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

    private count: number = 0;

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
        this.count = 0;
        let carregando = this.loadingCtrl.create({ content: "Aguarde, carregando ONT's..." });
        carregando.present();
        this.ontsLivresService
            .getOntsDisp(this.holderService.instancia, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < this.holderService.rcount) {
                            this.count++;
                            this.ontsLivresService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output)) {
                                            if (resposta.output.onts) {
                                                this.onts = resposta.output.onts;
                                                super.showAlert("ONT's", "Busca realizada com sucesso.");
                                            } else {
                                                super.showAlert("ONT's", "Não foram encontradas ONT's disponiveis");
                                                this.navCtrl.pop();
                                            }
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        } else {
                                            carregando.dismiss();
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert("Ops, aconteceu algo.", error.mError);
                                    carregando.dismiss();
                                    clearInterval(rqSi);
                                });
                        } else {
                            super.showAlert("Ops, aconteceu algo.", "Tempo de busca excedido por favor tente novamente.");
                            carregando.dismiss();
                            clearInterval(rqSi);
                        }
                    }, this.holderService.rtimeout);
                }
            }, error => {
                // error.mError
                super.showAlert("Ops, aconteceu algo.", error.mError);
            });
    }

    public setOnt(ont: Ont) {
        this.count = 0;
        let carregando = this.loadingCtrl.create({ content: "Aguarde, associando ONT..." });
        carregando.present();
        this.ontsLivresService
            .setOntsDisp(ont.serial, this.holderService.cadastro)
            .then(response => {
                if (response) {
                    let rqSi = setInterval(() => {
                        if (this.count < 9) {
                            this.count++;
                            this.ontsLivresService
                                .gettask(response.id)
                                .then(resposta => {
                                    if (resposta.state === "EXECUTED") {
                                        if (super.validState(resposta.output)) {
                                            let idx: number = this.holderService.certification.fulltest.valids.map(function (e) { return e.nome; }).indexOf("Associação Serial ONT");
                                            let setValidOnt: Valids;
                                            setValidOnt = {
                                                foiCorrigido: true,
                                                mensagem: "Identificado ONT associada: " + resposta.output.serial.serial,
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
                                            // carregando.dismiss();
                                            this.navCtrl.pop();
                                            clearInterval(rqSi);
                                        } else {
                                            // carregando.dismiss();
                                            this.navCtrl.pop();
                                            clearInterval(rqSi);
                                        }
                                    }
                                }, error => {
                                    super.showAlert("Ops, aconteceu algo.", error.mError);
                                    // carregando.dismiss();
                                    this.navCtrl.pop();
                                    clearInterval(rqSi);
                                });
                        } else {
                            super.showAlert("Ops, aconteceu algo.", "Tempo de busca excedido por favor tente novamente.");
                            // carregando.dismiss();
                            this.navCtrl.pop();
                            clearInterval(rqSi);
                        }
                    }, 15000);
                }
            }, error => {
                super.showAlert("Erro", error.mError);
            })
            .then(() => {
                carregando.dismiss();
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