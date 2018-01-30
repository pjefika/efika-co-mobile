import { Component, OnInit } from '@angular/core';
import { ConfiguracoesPortaService } from '../service-configuracoes-porta/configuracoes-porta.service';
import { Valids } from '../../../view-model/fulltest/validacao';
import { HolderService } from '../../../providers/holder/holder.service';

@Component({
    selector: 'servicos-component',
    templateUrl: 'servicos.component.html'
})

export class ServicosComponent extends ConfiguracoesPortaService implements OnInit {

    public profile: Valids;
    public vlans: Valids[];

    constructor(public holderService: HolderService) {
        super();
    }

    public ngOnInit() {
        this.getValid();
    }

    private getValid() {
        this.vlans = [super.getParameterValid(this.holderService.certification.fulltest.valids, "Vlan Banda Larga")];
        this.vlans.push(super.getParameterValid(this.holderService.certification.fulltest.valids, "Vlan VoIP"));
        this.vlans.push(super.getParameterValid(this.holderService.certification.fulltest.valids, "Vlan VoD/IPTV"));

        this.profile = super.getParameterValid(this.holderService.certification.fulltest.valids, "Profile");
    }

}