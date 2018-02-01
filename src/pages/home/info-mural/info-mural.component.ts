import { Component, OnInit } from '@angular/core';
import { InfoMuralService } from './info-mural.service';

@Component({
    selector: 'info-mural-component',
    templateUrl: 'info-mural.component.html',
    providers: [InfoMuralService]
})

export class InfoMuralComponent implements OnInit {

    public mostraMural: boolean = false;

    constructor(private infoMuralService: InfoMuralService) { }

    public ngOnInit() { 
        this.infoMuralService.logMural();
    }

}