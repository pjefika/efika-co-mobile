import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'fulltest-result-component',
    templateUrl: 'fulltest-result.component.html'
})

export class FulltestResultComponent implements OnInit {

    constructor(public holderService: HolderService) { }

    public ngOnInit() { }

}