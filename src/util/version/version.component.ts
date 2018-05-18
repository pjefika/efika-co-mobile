import { Component, OnInit } from '@angular/core';

declare var require: any

@Component({
    selector: 'version-component',
    templateUrl: 'version.component.html'
})

export class VersionComponent implements OnInit {

    public version: string;

    constructor() { }

    public ngOnInit() {
        this.getVersion();
    }

    public getVersion() {
        const { version: appVersion } = require("../../../package.json"); // Versão da aplicação na package.json
        this.version = appVersion;
    }

}