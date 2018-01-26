import { Component, OnInit } from '@angular/core';
import { HolderService } from '../../../providers/holder/holder.service';
import { Valids } from '../../../view-model/fulltest/validacao';

@Component({
    selector: 'parametros-view-component',
    templateUrl: 'parametros-view.component.html'
})

export class ParametrosViewComponent implements OnInit {

    public valid: Valids;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {
        this.getParameterValid();
    }


    private getParameterValid() {
        this.holderService.certification.fulltest.valids.forEach(valid => {
            if (valid.nome === "Parâmetros") {
                this.valid = valid;
            }
        });
    }

}