import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';

@Injectable()
export class InfoMuralService extends SuperService {

    constructor() {
        super();
    }

    public logMural() {
        console.log("Entrou Service Mural....");
    }


}