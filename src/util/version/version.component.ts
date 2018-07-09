import { Component, OnInit } from '@angular/core';
import { VersionService } from './version.service';
import { SuperComponentService } from '../../providers/component-service/super-component.service';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
    selector: 'version-component',
    templateUrl: 'version.component.html',
    providers: [VersionService]
})

export class VersionComponent extends SuperComponentService implements OnInit {

    public version: string;

    constructor(public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {
        super(alertCtrl, loadingCtrl);
    }

    public ngOnInit() {
        this.compareVersion();
    }

    public compareVersion() {
        this.version = super.getVersion();
        // this.versionService
        //     .getSpectedSystemVersion()
        //     .then(resposta => {
        //         console.log(resposta);
        //         if (this.version !== resposta.version) {
        //             super.showAlert("Versão divirgente", super.makeexceptionmessage("A versão do seu sistema é diferente da versão atual, por favor atualize sua página para baixar a nova versão, a versão mais atual é : " + resposta.version + "."), true);
        //         }
        //     }, error => {
        //         super.showAlert(error.tError, super.makeexceptionmessage(error.mError));
        //     });
    }

}