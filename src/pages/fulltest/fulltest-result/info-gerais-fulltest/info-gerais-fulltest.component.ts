import { Component, OnInit, Input } from '@angular/core';
import { Certification } from '../../../../view-model/certification/certification';
import { HolderService } from '../../../../providers/holder/holder.service';
import { ProbSolucao } from '../../../../view-model/fulltest/prob_solucao';
import { AlertController, LoadingController } from 'ionic-angular';
import { FulltestService } from '../../fulltest.service';
import { SuperComponentService } from '../../../../providers/component-service/super-component.service';

@Component({
    selector: 'info-gerais-fulltest-component',
    templateUrl: 'info-gerais-fulltest.component.html',
    providers: [FulltestService]
})

export class InfoGeraisFulltestComponent extends SuperComponentService implements OnInit {

    public numero: string;
    public sequencia: string;

    @Input() public certification: Certification;

    private popupMessageProbSolucao: ProbSolucao;

    public haveMessageForPopUp: boolean = false;

    constructor(public holderService: HolderService,
        public alertCtrl: AlertController,
        private fulltestService: FulltestService,
        public loadingCtrl: LoadingController) {
        super(alertCtrl, loadingCtrl, holderService);
    }

    public ngOnInit() {
        this.validMessageFromFulltest();
        this.numberValid();
    }

    public goToETA() {
        window.open("https://login.etadirect.com/gvt/mobility", "_blank");
    }

    public numberValid() {
        // Informar se planta é VIVO1 ou VIVO2
        // Informar sequencia das opções da URA
        if (this.holderService.cadastro.rede.planta === "VIVO2") {
            this.numero = "08006009192";
            //this.sequencia = "1-3-5";
        } else {
            this.numero = "08006012032";
            //this.sequencia = "3-2-5";
        }
    }

    private validMessageFromFulltest() {
        let msg: string = this.holderService.certification.fulltest.mensagem;
        let index = this.holderService
            .probSolucao
            .findIndex(p =>
                p.problema.includes(msg)
            );
        if (index != -1) {
            this.popupMessageProbSolucao = this.holderService.probSolucao[index];
            this.haveMessageForPopUp = true;
        }
    }

    public openPopUpToValid() {
        let confLeitura = this.alertCtrl.create({
            title: "Confirmação de leitura",
            message: this.popupMessageProbSolucao.solucao,
            buttons: [
                {
                    text: "Confirmo",
                    handler: () => {
                        this.fulltestService
                            .doConfirmMessage(this.holderService.certification.id)
                            .then(resposta => {
                                this.haveMessageForPopUp = false;
                                // super.showAlert("Confirmação", "Leitura confirmada");
                            }, error => {
                                super.showAlert(error.tError, super.makeexceptionmessage(error.mError, this.holderService.instancia));
                            });
                    }
                }
            ],
            enableBackdropDismiss: false
        });
        confLeitura.present();
    }

}