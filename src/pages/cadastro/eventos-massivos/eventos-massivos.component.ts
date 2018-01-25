import { Component, OnInit } from '@angular/core';
import { EventoMassivo } from '../../../view-model/evento-massivo/evento-massivo';

import { NavController } from "ionic-angular";
import { HolderService } from '../../../providers/holder/holder.service';


@Component({
    selector: 'eventos-massivos-component',
    templateUrl: 'eventos-massivos.component.html'
})

export class EventosMassivosComponent implements OnInit {

    public eventosMassivos: EventoMassivo[];

    constructor(public navCtrl: NavController,
        public holderService: HolderService) { }

    public ngOnInit() {
        this.eventosMassivos = this.holderService.cadastro.eventos;
    }

    public isVencido(dateInMs: number) {
        return new Date() > new Date(dateInMs) ? "red" : "";
    }

    public voltar() {
        this.navCtrl.pop();
    }

}