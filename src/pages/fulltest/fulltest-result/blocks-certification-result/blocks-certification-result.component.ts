import { Component, OnInit, Input } from '@angular/core';
import { Blocks } from '../../../../view-model/certification/blocks';

@Component({
    selector: 'blocks-certification-result-component',
    templateUrl: 'blocks-certification-result.component.html'
})

export class BlocksCertificationResultComponent implements OnInit {

    @Input() public blocks: Blocks[];

    constructor() { }

    public ngOnInit() { }
}