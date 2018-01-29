import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { SuperComponentService } from '../../../providers/component-service/super-compoenent.service';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'fulltest-result-component',
    templateUrl: 'fulltest-result.component.html'
})

export class FulltestResultComponent extends SuperComponentService implements OnInit {

    constructor(public holderService: HolderService,
        public alertCtrl: AlertController) {
        super(alertCtrl);
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
        if (super.clipboard(hClip)) {
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

}