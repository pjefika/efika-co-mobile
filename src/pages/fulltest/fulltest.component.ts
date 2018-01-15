import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'fulltest-component',
    templateUrl: 'fulltest.component.html'
})

export class FulltestComponent {

    constructor(public navCtrl: NavController) { }

    public ngOnInit() { }
}