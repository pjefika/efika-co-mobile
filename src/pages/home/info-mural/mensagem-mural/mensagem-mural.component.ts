import { Component, OnInit } from '@angular/core';
import { InfoMural } from '../../../../view-model/mural/mural';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'mensagem-mural-component',
    templateUrl: 'mensagem-mural.component.html'
})

export class MensagemMuralComponent implements OnInit {

    public infoMural: InfoMural;

    public url: string;

    constructor(public navParams: NavParams) { }

    public ngOnInit() {
        this.infoMural = this.navParams.data;
        this.mountLink();
    }

    public openLink() {
        window.open(this.infoMural.action.linkref);
    }

    public mountLink() {
        this.url = window.location.href + this.infoMural.action.linkDownload;       
        console.log(this.url);
        
    }

}