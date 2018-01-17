import { Component, OnInit } from '@angular/core';
import { ObjectValid } from '../../../view-model/fulltest/objectValid';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'fulltest-result-component',
    templateUrl: 'fulltest-result.component.html'
})

export class FulltestResultComponent implements OnInit {

    public objectValid: ObjectValid;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        if (this.holderService.objectValid) {
            this.objectValid = this.holderService.objectValid;
        }

    }

}