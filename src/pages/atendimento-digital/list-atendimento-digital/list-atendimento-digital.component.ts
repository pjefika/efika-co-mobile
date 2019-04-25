import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';
import { NavController } from 'ionic-angular';
import { DescAtendimentoDigitalComponent } from './desc-atendimento-digital/desc-atendimento-digital.component';

@Component({
    selector: 'list-atendimento-digital',
    templateUrl: 'list-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class ListAtendimentoDigitalComponent implements OnInit {

    constructor(private atendimentoDigitalService: AtendimentoDigitalService,
        public navCtrl: NavController) { }

    public ngOnInit() { }

    public getAtendimentos() {
        this.atendimentoDigitalService.getAtendimentos();
    }

    public openDescAtendimentoDigital() {
        this.navCtrl.push(DescAtendimentoDigitalComponent);
    }


}