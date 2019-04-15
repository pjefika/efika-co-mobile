import { Component, OnInit } from '@angular/core';
import { AtendimentoDigitalService } from '../atendimento-digital.service';

@Component({
    selector: 'list-atendimento-digital',
    templateUrl: 'list-atendimento-digital.component.html',
    providers: [AtendimentoDigitalService]
})

export class ListAtendimentoDigitalComponent implements OnInit {

    constructor(private atendimentoDigitalService: AtendimentoDigitalService) { }

    public ngOnInit() { }

    public getAtendimentos() {
        this.atendimentoDigitalService.getAtendimentos();
    }

}