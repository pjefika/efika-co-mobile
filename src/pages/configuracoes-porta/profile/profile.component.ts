import { Component, OnInit } from '@angular/core';
import { SuperConfPortaService } from '../service-configuracoes-porta/super-conf-porta.service';

@Component({
    selector: 'profile-component',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent extends SuperConfPortaService implements OnInit {

    constructor() {
        super();
    }

    public ngOnInit() { }

    public editProfileToShow(down: string, up: string): string {
        let prof: string;
        prof = down.replace(/[^0-9]/g, '') + "/" + up.replace(/[^0-9]/g, '');
        return prof;
    }
}