import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'estado-operacional-porta-component',
    templateUrl: 'estado-operacional-porta.component.html'
})

export class EstadoOperacionalPortaComponent extends SuperConfPortaService implements OnInit {

    constructor() { super(); }

    public ngOnInit() { }

}