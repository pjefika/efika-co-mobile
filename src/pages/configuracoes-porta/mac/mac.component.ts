import { Component, OnInit, Input } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';
import { Valids } from '../../../view-model/fulltest/validacao';

@Component({
    selector: 'mac-component',
    templateUrl: 'mac.component.html'
})

export class MacComponent extends SuperConfPortaService implements OnInit {

    @Input() public valid: Valids;

    constructor() {
        super();
    }

    public ngOnInit() { }

}