import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../../providers/holder/holder.service';
import { RedeExterna } from '../../../../view-model/cadastro/rede-externa';

@Component({
    selector: 'info-rede-externa-component',
    templateUrl: 'info-rede-externa.component.html'
})

export class InfoRedeExternaComponent implements OnInit {

    public redeExterna: RedeExterna;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.holderService.cadastro.redeExterna = this.redeExterna;
    }

}