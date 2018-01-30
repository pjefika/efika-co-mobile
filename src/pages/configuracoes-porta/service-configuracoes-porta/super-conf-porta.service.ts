import { Injectable, Input } from '@angular/core';
import { Valids } from '../../../view-model/fulltest/validacao';

@Injectable()
export class SuperConfPortaService {

    @Input() public valid: Valids;
    @Input() public valids: Valids[];

    constructor() { }
    
}