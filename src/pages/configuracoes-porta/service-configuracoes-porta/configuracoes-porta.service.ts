import { Injectable } from '@angular/core';
import { Valids } from '../../../view-model/fulltest/validacao';

@Injectable()
export class ConfiguracoesPortaService {

    constructor() { }

    public getParameterValid(valid: Valids[], validName: string): Valids {
        let rValid: Valids;
        valid.forEach(valid => {
            if (valid.nome === validName) {
                rValid = valid;
            }
        });
        return rValid;
    }

}