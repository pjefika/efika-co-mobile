import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Output } from '../../view-model/task-process/output-task';
import { ExceptionService } from '../exception/exception.service';

@Injectable()
export class SuperComponentService extends ExceptionService {

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
    public validState(output: Output, instancia: string): boolean {
        let v: boolean;
        switch (output.state) {
            case "OK":
                v = true;
                break;
            case "EXCEPTION":
                v = false;
                this.showAlert("Ops, aconteceu algo", super.makeexceptionmessage(output.exceptionMessage, instancia));
                console.log("Deu erro -- EXCEPTION IN: " + output.type + " -- !!! AMD p(o.o)q");
                break;
        }
        return v;
    }

    public validCustomer(output: Output, instancia: string): boolean {
        let v: boolean = false;
        if (!output.customer.rede.ipDslam) {
            this.showAlert("Ops, aconteceu algo", super.makeexceptionmessage("Não foram identificados informações de rede do cliente, não sendo possivel realizar testes.", instancia));
        }
        if (output.customer.designador) {
            v = true;
        }
        return v;
    }

}