import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';
import { HolderService } from '../holder/holder.service';

@Injectable()
export class LinkService extends SuperService {

    constructor(public holderService: HolderService) {
        super(holderService);
    }


}