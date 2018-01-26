import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'modulacao-component',
    templateUrl: 'modulacao.component.html'
})

export class ModulacaoComponent extends SuperConfPortaService implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() { }
}