import { Injectable } from '@angular/core';
import { UrlService } from '../../providers/url-service/url.service';
import { SuperService } from '../../providers/super-service/super.service';

@Injectable()
export class FulltestService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

}