import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'toolbox-component',
    templateUrl: 'toolbox.component.html'
})

export class ToolboxComponent implements OnInit {

    constructor(public navCtrl: NavController) { }

    public ngOnInit() { }    
}