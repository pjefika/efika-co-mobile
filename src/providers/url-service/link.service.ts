import { Injectable } from '@angular/core';
import { SuperService } from '../super-service/super.service';

@Injectable()
export class LinkService extends SuperService {

    constructor() {
        super();
    }


}