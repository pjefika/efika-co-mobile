import { Injectable } from '@angular/core';
import { InfoRequest } from '../../view-model/url-service/info-request';
import { HolderService } from '../holder/holder.service';
import { ExceptionService } from '../exception/exception.service';

/**
 * Serviço que contem o necessário para a classe de serviço que irá estender a mesma.
 */
@Injectable()
export class SuperService extends ExceptionService {

    // public abcsd: string = "http://10.40.196.172:9001/";
    public abcsd: string = "http://54.94.208.183:9001/";


    public infoResquest: InfoRequest;

    constructor(public holderService: HolderService) {
        super();
    }

}