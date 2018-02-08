import { Injectable } from '@angular/core';
import { Valids } from '../../../view-model/fulltest/validacao';

@Injectable()
export class ConfiguracoesPortaService {

    constructor() { }

    public getParameterValid(valid: Valids[], validName: string, validNameTwo?: string): Valids {

        let rValid: Valids;
        valid.forEach(valid => {
            if (valid.nome === validName || valid.nome === validNameTwo) {
                rValid = valid;
            }
        });
        return rValid;
    }

}