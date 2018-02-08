import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../../providers/holder/holder.service';
import { Radius } from '../../../../view-model/cadastro/radius';

@Component({
    selector: 'info-radius-component',
    templateUrl: 'info-radius.component.html'
})

export class InfoRadiusComponent implements OnInit {

    public radius: Radius;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.radius = this.holderService.cadastro.radius;
    }

}