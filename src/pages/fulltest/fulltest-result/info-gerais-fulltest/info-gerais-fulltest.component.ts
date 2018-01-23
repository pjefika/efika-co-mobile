import { Component, OnInit, Input } from '@angular/core';
import { Certification } from '../../../../view-model/certification/certification';

@Component({
    selector: 'info-gerais-fulltest-component',
    templateUrl: 'info-gerais-fulltest.component.html'
})

export class InfoGeraisFulltestComponent implements OnInit {

    @Input() public certification: Certification;

    constructor() { }

    public ngOnInit() { }

    public goToETA() {
        window.open("https://login.etadirect.com/gvt.etadirect.com", "_blank");
    }
}