import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'associacao-ont-component',
    templateUrl: 'associacao-ont.component.html'
})

export class AssociacaoOntComponent extends SuperConfPortaService implements OnInit {

    constructor() { super(); }

    public ngOnInit() { console.log(this.valid) }

}