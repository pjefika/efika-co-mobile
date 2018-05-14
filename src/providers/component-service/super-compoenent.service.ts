import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Output } from '../../view-model/task-process/output-task';
import { ClipBoardService } from '../clipboard/clipboard.service';

@Injectable()
export class SuperComponentService extends ClipBoardService {

    public ativo: boolean = false;
    public titulo: string;
    public mensagem: string;
    public tipo: string;

    constructor(public alertCtrl: AlertController) {
        super();
    }

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

    /**
     * 
     * @param output 
     * Tratativa do state do Output
     * Se EXCEPTION faz chamada automatica do showError mostrando informação.
     */
    public validState(output: Output): boolean {
        let v: boolean;
        switch (output.state) {
            case "OK":
                v = true;
                break;
            case "EXCEPTION":
                v = false;
                // this.showError(true, "erro", "Ops, aconteceu algo.", output.exceptionMessage);
                this.showAlert("Ops, aconteceu algo", output.exceptionMessage);
                console.log("Deu erro -- EXCEPTION IN: " + output.type + " -- !!! AMD p(o.o)q");
                break;
        }
        return v;
    }

    public validCustomer(output: Output): boolean {
        let v: boolean = false;
        if (output.customer.designador) {
            v = true;
        }
        return v;
    }

}