import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Output } from '../../view-model/task-process/output-task';

@Injectable()
export class SuperComponentService {

    public ativo: boolean = false;
    public titulo: string;
    public mensagem: string;
    public tipo: string;

    constructor(public alertCtrl: AlertController) { }

    public showError(ativo: boolean, tipo?: string, titulo?: string, mensagem?: string) {
        this.ativo = ativo;
        this.tipo = tipo;
        this.titulo = titulo;
        this.mensagem = mensagem;
    }

    public showAlert(titulo: string, subTitle: string) {
        let alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subTitle,
            buttons: ["Ok"]
        });
        alert.present();
    }

    public validState(output: Output): boolean {
        let v: boolean;
        switch (output.state) {
            case "OK":
                v = true;
                break;
            case "EXCEPTION":
                v = false;
                this.showError(true, "erro", "Ops, aconteceu algo.", output.exceptionMessage);
                console.log("Deu erro -- EXCEPTION IN: " + output.type + " -- !!! AMD p(o.o)q");
                break;
        }
        return v;
    }

}