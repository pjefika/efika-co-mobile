import { Component, OnInit, Input } from '@angular/core';
import { Cadastro } from '../../../view-model/cadastro/cadastro';

@Component({
    selector: 'info-cadastro-component',
    templateUrl: 'info-cadastro.component.html'
})

export class InfoCadastroComponent implements OnInit {

    @Input() public cadastro: Cadastro;

    constructor() { }

    public ngOnInit() {
        
    }

}