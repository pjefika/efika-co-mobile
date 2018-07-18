import { Injectable } from '@angular/core';
import { SuperService } from '../../../providers/super-service/super.service';
import { UrlService } from '../../../providers/new_url-service/url.service';
import { HolderService } from '../../../providers/holder/holder.service';

@Injectable()
export class UserModifyService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }
    
}