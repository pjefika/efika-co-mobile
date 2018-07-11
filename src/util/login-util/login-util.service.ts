import { Injectable } from '@angular/core';
import { HolderService } from '../../providers/holder/holder.service';

@Injectable()
export class LoginUtilService {

    constructor(public holderService: HolderService) { }

    public isLogado(): boolean {        
        if (localStorage.getItem('user')) {
            return true
        }
        return false;        
    }

}