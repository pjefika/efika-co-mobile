import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-component.service';
import { AlertController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';
import { InfoClipBoard } from '../../../view-model/clipboard/info-clipboard';
import { ClipBoardService } from '../../../providers/clipboard/clipboard.service';

@Component({
    selector: 'fulltest-result-component',
    templateUrl: 'fulltest-result.component.html'
})

export class FulltestResultComponent extends SuperComponentService implements OnInit {

    constructor(public holderService: HolderService,
        public alertCtrl: AlertController,
        public clipBoardService: ClipBoardService,
        public loadingCtrl: LoadingController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() { }

    public copiarResumoInfo() {
        let hClip: string;
        let cadastro = this.holderService.cadastro;
        let certification = this.holderService.certification;
        if (cadastro) {
            hClip = this.trataCopy(cadastro);
            if (certification) {
                hClip = hClip + "\n\n||** Fulltest **||\n" + this.trataCopy(certification);
            }
        }
        if (this.clipBoardService.clipboard(hClip)) {
            super.showAlert("Clipboard", "Conteúdo copiado com sucesso.");
        }
    }

    private trataCopy(info: any): string {
        let trat: string;
        trat = JSON.stringify(info);
        for (let i = 0; i < trat.length; i++) {
            trat = trat
                .replace("{", "")
                .replace("}", "")
                .replace("[", "")
                .replace("]", "")
                .replace("\",\"", "\n")
                .replace("\":\"", " : ")
                .replace(",", "\n")
                .replace("\"", "");
        }
        return trat;
    }

    public mountInfo() {
        let infoClipBoard: InfoClipBoard = new InfoClipBoard();
        let dataFim: moment.Moment = moment(this.holderService.certification.dataFim);
        let userSession = JSON.parse(localStorage.getItem("user"));

        infoClipBoard.dataAcao = dataFim.format('DD/MM/YYYY HH:mm:ss').toString();
        infoClipBoard.tecnico = userSession.user;
        infoClipBoard.protocolo = this.holderService.certification.fkId;
        this.holderService.certification.fulltest.valids.forEach(valid => {
            if (valid.result) {
                switch (valid.result.nome) {
                    case "MAC do Equipamento":
                        infoClipBoard.autenticado = valid.result ? "Sim - " + valid.mensagem : "Não - " + valid.mensagem;
                        break;
                    case "Parâmetros":
                        infoClipBoard.parametro = valid.mensagem;
                        infoClipBoard.velSincDown = valid.result.velSincDown;
                        infoClipBoard.velSincUp = valid.result.velSincUp;
                        break;
                    case "Parâmetros Ópticos":
                        infoClipBoard.parametro = valid.mensagem;
                        infoClipBoard.potOlt = valid.result.potOlt;
                        infoClipBoard.potOnt = valid.result.potOnt;
                        break;
                }
            }
        });

        if (this.clipBoardService.clipboard(this.trataCopy(infoClipBoard))) {
            super.showAlert("Clipboard", "Conteúdo copiado com sucesso.");
        }

    }

}