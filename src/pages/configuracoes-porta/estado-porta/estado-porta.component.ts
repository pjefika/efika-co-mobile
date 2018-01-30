import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'estado-porta-component',
    templateUrl: 'estado-porta.component.html'
})

export class EstadoPortaComponent extends SuperConfPortaService implements OnInit {

    constructor() { super(); }

    public ngOnInit() { }

}