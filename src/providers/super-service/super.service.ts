import { Injectable } from '@angular/core';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { HolderService } from '../holder/holder.service';
import { ExceptionService } from '../exception/exception.service';

@Injectable()
export class SuperService extends ExceptionService {

    public infoResquest: InfoRequest;

    constructor(public holderService: HolderService) {
        super();
    }

}