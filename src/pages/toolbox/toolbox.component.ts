import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RoboManobraComponent } from '../robo-manobra/robo-manobra.component';

@Component({
    selector: 'toolbox-component',
    templateUrl: 'toolbox.component.html'
})

export class ToolboxComponent implements OnInit {

    constructor(public navCtrl: NavController) { }

    public ngOnInit() { }

    public openNavManobra() {
        this.navCtrl.push(RoboManobraComponent);
    }

}