import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alert-mensagem-component',
    templateUrl: 'alert-mensagem.component.html'
})

export class AlertMensagemComponent implements OnInit {

    @Input() public ativo: boolean = false;
    @Input() public titulo: string;
    @Input() public mensagem: string;
    
    constructor() { }

    public ngOnInit() { }

}