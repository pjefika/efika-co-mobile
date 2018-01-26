import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'vlanbanda-component',
    templateUrl: 'vlanbanda.component.html'
})

export class VlanbandaComponent extends SuperConfPortaService implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() { }
}