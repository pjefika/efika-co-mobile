import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from '../../../providers/holder/holderService';
import { ObjectValid } from '../../../view-model/fulltest/objectValid';
import { HomePage } from '../../home/home';
import { CadastroComponent } from '../../cadastro/cadastro.component';

@Component({
    selector: 'fulltest-result-component',
    templateUrl: 'fulltest-result.component.html'
})

export class FulltestResultComponent implements OnInit {

    @Input() public objectValid: ObjectValid;

    constructor(public holderService: HolderService,
        public homePage: HomePage) { }

    public ngOnInit() {

        if (!this.objectValid && this.holderService.objectValid) {
            this.objectValid = this.holderService.objectValid;
        }

    }

    private goToCadastroComponent() {
        this.homePage.setToDynamicComponent(CadastroComponent);
    }

}