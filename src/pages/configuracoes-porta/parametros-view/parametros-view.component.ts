import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'parametros-view-component',
    templateUrl: 'parametros-view.component.html'
})

export class ParametrosViewComponent extends SuperConfPortaService implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() { }

}