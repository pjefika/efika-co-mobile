import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'confiabilidade-rede-component',
    templateUrl: 'confiabilidade-rede.component.html'
})

export class ConfiabilidadeRedeComponent extends SuperConfPortaService implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() { }

}