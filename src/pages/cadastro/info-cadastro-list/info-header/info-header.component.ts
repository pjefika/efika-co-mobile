import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../../providers/holder/holder.service';

@Component({
    selector: 'info-header-component',
    templateUrl: 'info-header.component.html'
})

export class InfoHeaderComponent implements OnInit {

    constructor(public holderService: HolderService) {

    }

    public ngOnInit() { }

}